
import { SvgPageHeader } from '../../app/constantComponents';
import './PageTemplate.css';

export default function PageTemplate ({ className = '', title = 'Page Title', children = <></> }) {

    return (
        <section className={`w-100 vh-100 d-flex flex-column ${className}`} >
            <div className='w-100 position-relative' >
                <SvgPageHeader className='w-100 h-auto text-primary' />
                <h1 className='fw-bold fs-4 position-absolute w-100 text-center text-vertical-center text-white' >{title}</h1>
            </div>
            <div className='overflow-auto w-100 h-100 p-2 d-flex flex-column gap-1 align-items-center' >
                {children}
            </div>
        </section>
    );

}
