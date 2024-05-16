function Information() {
    return (
        <>
            <h2>¿Quiénes somos?</h2>
            {/* Justificar el texto del contenedor */}
            <div className="info" style={{ textAlign: 'justify' }}>
                <p>
                    Somos un grupo de estudiantes de Ingeniería Matemática e Inteligencia Artificial
                    en la Universidad Pontificia de Comillas, ICAI.
                </p>
                <br/>
                <p>
                    Esta página web ha sido creada como proyecto final de la asignatura de
                    Desarrollo de Aplicaciones y Servicios. Es un catálogo de películas que
                    permite a los usuarios registrados crear reseñas de películas y puntuarlas.
                    También se pueden buscar películas por título, género, director, actores y
                    puntuación.
                </p>
                <br/>
                <p>
                    Esperamos que les resulte útil y accesible.
                </p>
            </div>
        </>
    )
}

function Info() {
  return (
    <>
        <div className="container">
            <Information/>
        </div>
    </>
  )
}

export default Info
