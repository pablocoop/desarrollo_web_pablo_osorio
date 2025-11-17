from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)

    comunas = db.relationship('Comuna', back_populates='region')

class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)

    region = db.relationship('Region', back_populates='comunas')
    avisos = db.relationship('AvisoAdopcion', back_populates='comuna')

class AvisoAdopcion(db.Model):
    __tablename__ = 'aviso_adopcion'
    id = db.Column(db.Integer, primary_key=True)
    fecha_ingreso = db.Column(db.DateTime, nullable=False)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'), nullable=False)
    sector = db.Column(db.String(100))
    nombre = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(15))
    tipo = db.Column(db.Enum('gato', 'perro', name='tipo_enum'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    unidad_medida = db.Column(db.Enum('a', 'm', name='unidad_medida_enum'), nullable=False)
    fecha_entrega = db.Column(db.DateTime, nullable=False)
    # MySQL usa TEXT(500); en SQLAlchemy usamos Text con longitud específica
    descripcion = db.Column(db.Text(500))

    comuna = db.relationship('Comuna', back_populates='avisos')
    fotos = db.relationship('Foto', back_populates='aviso', cascade='all, delete-orphan', foreign_keys='Foto.actividad_id')
    contactos = db.relationship('ContactarPor', back_populates='aviso', cascade='all, delete-orphan', foreign_keys='ContactarPor.actividad_id')
    comentarios = db.relationship(
        'Comentario',
        back_populates='aviso',
        cascade='all, delete-orphan'
    )
class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), primary_key=True)
    aviso = db.relationship('AvisoAdopcion', back_populates='fotos')

class ContactarPor(db.Model):
    __tablename__ = 'contactar_por'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), primary_key=True)
    nombre = db.Column(db.Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra', name='contacto_enum'), nullable=False)
    identificador = db.Column(db.String(150), nullable=False)
    aviso = db.relationship('AvisoAdopcion', back_populates='contactos')

class Comentario(db.Model):
    __tablename__ = 'comentario'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(80), nullable=False)
    texto = db.Column(db.String(300), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    aviso_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable=False)

    aviso = db.relationship('AvisoAdopcion', back_populates='comentarios')

