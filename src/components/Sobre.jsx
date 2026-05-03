import sobreImg from '../assets/sobre-img.png'
import './Sobre.css'

export default function Sobre() {
  return (
    <section id="sobre">
      <div className="sobre-visual-wrap reveal">
        <div className="sobre-visual">
          <img src={sobreImg} alt="Brisa Gym" className="sobre-img" />
        </div>
        <div className="sobre-quote">
          <p>
            Si esta imagen de bienestar conecta contigo,<br />
            <strong>ya tenemos las inscripciones abiertas.</strong>
          </p>
        </div>
      </div>

      <div>
        <p className="sec-lbl reveal">Sobre nosotros</p>
        <h2 className="sec-title reveal">
          Un gimnasio pensado<br /><em>para las personas</em>
        </h2>
        <div className="divider-line reveal" />
        <p className="body-t reveal">
          Brisa Gym nace en el corazón de Gran Alacant con una visión clara: crear un espacio donde el entrenamiento sea accesible, efectivo y placentero para todos.
        </p>
      </div>
    </section>
  )
}
