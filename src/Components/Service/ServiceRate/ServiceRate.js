import React from 'react'
import './ServiceRate.css'
import OButton from '../../OButton/OButton'

const Rate = () => {
    return (
        <div className="rating">
            <input type="radio" name="star" id="star1" /><label for="star1" />
            <input type="radio" name="star" id="star2" /><label for="star2" />
            <input type="radio" name="star" id="star3" /><label for="star3" />
            <input type="radio" name="star" id="star4" /><label for="star4" />
            <input type="radio" name="star" id="star5" /><label for="star5" />
        </div>
    );
}

const ServiceRate = ({ rateTo, name, onClick }) => {
    return (
        <div>
            <div className='o-service-rate'>
                <div className='o-servicerate-header'>
                    <h3>{`Califica a tu ${rateTo}`}</h3>
                </div>
                <p className='o-rate-info'>{`¿Cómo te fue con ${name}?`}</p>
                {/*rate*/}
                <Rate />
                <p className='o-rate-info'>¿Deseas añadir un comentario adicional?</p>
                <textarea id="textarea" cols="30" rows="5" placeholder="Escríbelo aquí..."></textarea>
            </div>
            <div className="rate-button">
                <OButton label="Enviar" onClick={onClick} />
            </div>
        </div>

    )
}

export default ServiceRate