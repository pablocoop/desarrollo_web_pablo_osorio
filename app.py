from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from config import Config
from datetime import datetime
import os
from models import db, AvisoAdopcion, ContactarPor, Comuna, Foto   # Importamos la instancia de db desde models.py
from utils.validations import validate_aviso_form
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db.init_app(app)  # Inicializamos la conexión

@app.route('/')
def index():
    avisos = AvisoAdopcion.query.order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
    return render_template('index.html', avisos=avisos)

@app.route('/agregar', methods=['GET', 'POST'])
def agregar():
    if request.method == 'POST':
        data = request.form
        files = request.files.getlist('fotos')

        # Validar backend
        valido, errores = validate_aviso_form(data, files)
        if not valido:
            return render_template('create_post.html', errores=errores, form=data)

        # Validar comuna
        comuna_nombre = data.get('comuna', '').strip()
        comuna = Comuna.query.filter_by(nombre=comuna_nombre).first()
        if comuna is None:
            return render_template('create_post.html', errores=["Comuna inválida."], form=data)

        # Mapear unidad de medida ('años' → 'a', 'meses' → 'm')
        unidad_map = {'años': 'a', 'meses': 'm'}
        unidad_bd = unidad_map.get(data.get('unidad_edad'))

        aviso = AvisoAdopcion(
            fecha_ingreso=datetime.now(),
            comuna_id=comuna.id,
            sector=data.get('sector') or None,
            nombre=data.get('nombre').strip(),
            email=data.get('email').strip(),
            celular=data.get('telefono') or None,
            tipo=data.get('especie'),
            cantidad=int(data.get('cantidad')),
            edad=int(data.get('edad')),
            unidad_medida=unidad_bd,
            fecha_entrega=datetime.fromisoformat(data.get('fecha_entrega')),
            descripcion=data.get('descripcion') or None
        )
        db.session.add(aviso)
        db.session.flush()  # asegura id disponible

        # Contacto
        red = data.get('contactar_por')
        ident = data.get('contacto_id', '').strip()
        if red and ident:
            db.session.add(ContactarPor(
                nombre=red,
                identificador=ident,
                actividad_id=aviso.id
            ))

        # Fotos
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        for f in files:
            if f.filename:
                filename = secure_filename(f.filename)
                ruta_rel = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                f.save(ruta_rel)
                db.session.add(Foto(
                    ruta_archivo=ruta_rel,
                    nombre_archivo=filename,
                    actividad_id=aviso.id
                ))

        db.session.commit()
        flash("✅ Aviso agregado correctamente.", "success")
        return redirect(url_for('index'))

    # GET → mostrar formulario vacío
    return render_template('create_post.html')

@app.route('/listado')
def listado():
    page = request.args.get('page', 1, type=int)
    per_page = 5
    avisos = AvisoAdopcion.query.order_by(AvisoAdopcion.fecha_ingreso.desc()).paginate(page=page, per_page=per_page)
    return render_template("list_post.html", avisos=avisos)
@app.route('/aviso/<int:aviso_id>')
def mostrar_aviso(aviso_id):
    aviso = AvisoAdopcion.query.get_or_404(aviso_id)
    return render_template('show_post.html', aviso=aviso)
@app.route('/estadisticas')
def estadisticas():
    return render_template('stats.html')


if __name__ == '__main__':
    app.run(debug=True)
