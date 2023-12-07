import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
    }

    const handleResetApp = () => {
        const resultado = confirm('Acción irreversible ¿Eliminar registros?')
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    background
                    backgroundPadding={4}
                    styles={buildStyles({
                        backgroundColor: porcentaje > 100 ? '#fc5185' : '#00b090',
                        textColor: "#000",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Reset App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : 'positivo'}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto