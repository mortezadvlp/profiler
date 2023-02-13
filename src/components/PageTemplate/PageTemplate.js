
import { SvgPageHeader } from '../../app/constantComponents';
import './PageTemplate.css';

export default function PageTemplate ({ smallView = false, className = '', title = 'Page Title', children = <></> }) {

    return (
        <>
        {
        smallView
        ?
            <div className='overflow-auto w-100 h-100 p-2 d-flex flex-column gap-1 align-items-center' >
                {children}
            </div>
        :
            <section className={`w-100 vh-100 d-flex flex-column border-end border-primary ${className}`} >
                <div className='w-100 position-relative' >
                    <SvgPageHeader className='text-primary' />
                    <h1 className='fw-bold fs-4 position-absolute w-100 text-center text-vertical-center text-white' >{title}</h1>
                </div>
                <div className='overflow-auto w-100 h-100 py-2 d-flex flex-column gap-1 align-items-center' >
                    {children}
                </div>
            </section>
        }
        </>
    );

}
