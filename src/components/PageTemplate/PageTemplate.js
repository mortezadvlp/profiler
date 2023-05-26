
import { SvgPageHeader } from '../../app/constantComponents';
import './PageTemplate.css';

export default function PageTemplate ({ smallView = false, className = '', title = 'Page Title', children = <></> }) {

    return (
        <>
        {
        smallView
        ?
            <div className='overflow-auto w-100 p-2 d-flex flex-column gap-1 align-items-center' >
                {children}
            </div>
        :
            <section className={`w-100 h-100 d-flex flex-column border-end border-primary ${className}`} >
                <div className='w-100 position-relative pb-2' >
                    <SvgPageHeader className='text-primary' />
                    <h1 className='fw-bold fs-4 position-absolute w-50 text-vertical-center ps-4 text-primary' >{title}</h1>
                </div>
                <div className='overflow-auto w-100 h-100 py-2 d-flex flex-column gap-1 align-items-center' >
                    {children}
                </div>
            </section>
        }
        </>
    );

}
