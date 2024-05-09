import { useState } from 'react'
import './App.css'

import Footer from './Footer.jsx'
import Header from './Header.jsx'

function MoreInfo(){
    return (
        <>
        <div className="container">
            <Information/>
            <ContactForm/>
        </div>
        </>
    )
}

function Information() {
    return (
        <>
        <h2>¿Quiénes somos?</h2>
            <div className="info">
            <h2 id="title" />
            <p>
                Somos una tienda fundada en 2024 dedicada a la venta minorista de
                productos tecnológicos a buen precio.
            </p>
            <p>
                Nuestro teléfono de atención al cliente es 91606066 de 8h a 19h de lunes
                a viernes.
            </p>
            <p>
                Pero también puedes contactarnos a cualquier hora con el siguiente
                formulario.
            </p>
            </div>
        </>
    )
}

function ContactFormLong() {
    return (
        <>
            <form action="" method="post">
                <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Nombre" required="" />
                </div>
                <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" required="" />
                </div>
                <div className="form-control">
                <label htmlFor="subject">Rating</label>
                <input type="text" id="subject" placeholder="Asunto" />
                </div>
                <div className="form-control">
                <label htmlFor="message">Review</label>
                <textarea name="message" placeholder="Review" defaultValue={""} />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

function ContactForm() {
    return (
        <>
            <form action="" method="post">
                <QuestionForm id="name" type="text" placeholder="Nombre" text="Nombre"/>
                <QuestionForm id="email" type="email" placeholder="Email" text="Email"/>
                <QuestionForm id="subject" type="text" placeholder="Asunto" text="Asunto"/>
                <QuestionForm id="message" type="text" placeholder="Mensaje" text="Mensaje"/>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

function QuestionForm({id, type, placeholder="", required="", defaultValue="", text=""}) {
    return (
        <>
        <div className="form-control">
            <label htmlFor={id}>{text}</label>
            <input type={type} id={id} placeholder={placeholder} required={required} defaultValue={defaultValue}/>
        </div>
        </>
    )
}


function Info() {
  return (
    <>
      <MoreInfo/>
    </>
  )
}

export default Info
