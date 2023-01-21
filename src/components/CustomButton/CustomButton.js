
import './CustomButton.css'

export default function CustomButton({ className = '',
    text = 'Click me!', onClick, hasIcon = false, svg=<></>
}) {

    const class_name = `border border-1 border-primary rounded-pill bg-white custom-button ${className}`;


    return (
        <>
        {hasIcon
        ?
            <button className={`d-flex flex-row justify-content-between gap-3 ${class_name} px-2 py-1`} >
                <span className='my-auto' >{text}</span>
                {svg}
            </button>
        :
            <button className={`${class_name} px-3 py-2 `} >
                {text}
            </button>
        }
        </>
    );
}
