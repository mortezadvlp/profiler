
import './CustomButton.css'

export default function CustomButton({ className = '', maxWidthPx = 0,
    text = 'Click me!', onClick, hasIcon = false, svg=<></>
}) {

    const class_name = `border border-1 border-primary rounded-pill bg-white custom-button fw-bold ${className}`;


    return (
        <>
        {hasIcon
        ?
            <button className={`d-flex flex-row justify-content-between gap-3 ${class_name} px-2 py-1`}
                style={{maxWidth: maxWidthPx > 0 ? `${maxWidthPx}px` : '100%'}} onClick={onClick} >
                <span className='my-auto' >{text}</span>
                {svg}
            </button>
        :
            <button className={`${class_name} px-3 py-2 `} style={{maxWidth: maxWidthPx > 0 ? `${maxWidthPx}px` : '100%'}} onClick={onClick} >
                {text}
            </button>
        }
        </>
    );
}
