
import { useRef } from 'react';
import './PrintProfile.css'
import { useReactToPrint } from 'react-to-print';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DegreeList, textLabels } from '../../app/constants';
import user_default from '../../images/user_default.png';
import { convertEnNumToFa, getCountryLabel, getDateString, toPersianDateDate } from '../../app/utilities';


export default function PrintProfile( {onPrintDone} ) {

    const divRef = useRef();
    const language = useSelector(state => state.settings.language);
    const personalData = useSelector(state => state.personal);
    const initAvatar = useSelector(state => state.personal.avatar);
    const avatar = initAvatar.toLowerCase().startsWith("http") ? initAvatar : localStorage.getItem('avatar');
    const educationData = useSelector(state => state.education);
    const workData = useSelector(state => state.workExperience);

    useEffect(() => {
        handlePrint();
    }, [])

    const marginTop="40px"
    const marginRight="40px"
    const marginBottom="50px"
    const marginLeft="40px"
    const getPageMargins = () => {
        return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
                        counter-increment: page;
                        counter-reset: page 1;
                        @top-right {
                            content: "Page " counter(page) " of " counter(pages);
                        }
                    }`;
    };

    const handlePrint = useReactToPrint({
        content: () => divRef.current,
        documentTitle: 'PrintProfile',
        onAfterPrint: () => onPrintDone(),
    })


    return (
        <div className='d-none' >
            <div className='w-100' ref={divRef} dir={language == 'en' ? 'ltr' : 'rtl'} >
                <style>{getPageMargins()}</style>
                <div className='w-100 d-flex flex-row gap-0 row' >
                    <aside className='d-flex flex-column gap-2 col-4 bg-print py-3 px-4 vh-100 position-fixed' >
                        <div className='mx-auto rounded-circle border overflow-hidden ratio-1x1'>
                            <img className='mx-auto' style={{width:'180px', height:'180px'}}
                                src={avatar ? avatar : user_default} />
                        </div>
                        <span className='mt-4' >{textLabels.firstName[language]}:</span>
                        <span className='ms-2 fw-bold' >{personalData.firstName}</span>
                        <span className='mt-2' >{textLabels.lastName[language]}:</span>
                        <span className='ms-2 fw-bold' >{personalData.lastName}</span>
                        <span className='mt-2' >{textLabels.birthDate[language]}:</span>
                        <span className='ms-2 fw-bold' >{personalData.birthDate === 0 ? '' : language === 'fa' ? convertEnNumToFa(toPersianDateDate(new Date(personalData.birthDate))) : getDateString(new Date(personalData.birthDate))}</span>
                        <span className='ms-2 mt-2 fw-bold' >{personalData.married ? textLabels.marriedStatus[language] : textLabels.notMarriedStatus[language]}</span>
                        <span className='mt-5' >{textLabels.contactInfo[language]}:</span>
                        {personalData.mobile&& <span className='ms-2 fw-bold' >{convertEnNumToFa(personalData.mobile)}</span>}
                        {(!personalData.mobile && personalData.phone)&& <span className='ms-2 fw-bold' >{convertEnNumToFa(personalData.phone)}</span>}
                        <span className='ms-2 text-break fw-bold' >{personalData.email}</span>
                        <span className='ms-2 text-wrap' >{convertEnNumToFa(personalData.address)}</span>
                    </aside>
                    <div className='col-4' >

                    </div>
                    <div className='d-flex flex-column gap-4 col-8 p-0' >
                        <section className='w-100 d-flex flex-column gap-2 ' >
                            <div className='w-100 bg-print p-2' >
                                <span className='fw-bold fw-larger' >{textLabels.educationTitle[language]}</span>
                            </div>
                            <div className='d-flex flex-column mx-3 gap-2 border-left' >
                                {educationData.map((data, indx) =>
                                    <div key={indx} className={`d-flex flex-column gap-2 ${indx === 0 ? '' : 'border-top pt-2'}`} >
                                        <div className='d-flex flex-row justify-content-between' >
                                            <span className='fw-bold' >
                                                {language === 'en' 
                                                                ? DegreeList.find(d => d.value === data.degree).label
                                                                : DegreeList.find(d => d.value === data.degree).fa}
                                            </span>
                                            <span >
                                                {`${textLabels.from[language]} 
                                                    ${language === 'fa' ? convertEnNumToFa(toPersianDateDate(new Date(data?.startDate))) : getDateString(new Date(data?.startDate))} 
                                                    ${textLabels.to[language]} 
                                                    ${data?.stillStudent ? textLabels.now[language] : language === 'fa' ? convertEnNumToFa(toPersianDateDate(new Date(data?.endDate))) : getDateString(new Date(data?.endDate))}`}
                                                </span>
                                        </div>
                                        <span className={language === 'fa' ? 'me-3' : 'ms-3'} >{`${data?.major} ${data?.orientation && data?.orientation !== '-' ? ` / ${data?.orientation}` : ''}`}</span>
                                        <span className={language === 'fa' ? 'me-3' : 'ms-3'} >{`${(data?.country === 'IR' && language === 'fa') ? data?.state : getCountryLabel(data?.country)} / ${data?.university}`}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                        <section className='w-100 d-flex flex-column gap-2'>
                            <div className='w-100 bg-print p-2' >
                                <span className='fw-bold fw-larger' >{textLabels.workExp[language]}</span>
                            </div>
                                <div className='d-flex flex-column mx-3 gap-2 border-left' >
                                {workData.map((data, indx) =>
                                    <div key={indx} className={`d-flex flex-column gap-2 ${indx === 0 ? '' : 'border-top pt-2'}`} >
                                        <div className='d-flex flex-row justify-content-between' >
                                            <span className='fw-bold' >{data.jobTitle}</span>
                                            <span >
                                                {`${textLabels.from[language]} 
                                                    ${language === 'fa' ? convertEnNumToFa(toPersianDateDate(new Date(data?.startDate))) : getDateString(new Date(data?.startDate))} 
                                                    ${textLabels.to[language]} 
                                                    ${data?.stillWorking ? textLabels.now[language] : language === 'fa' ? convertEnNumToFa(toPersianDateDate(new Date(data?.endDate))) : getDateString(new Date(data?.endDate))}`}
                                                </span>
                                        </div>
                                        <span className={language === 'fa' ? 'me-3' : 'ms-3'} >{`${(data?.country === 'IR' && language === 'fa') ? data?.state : getCountryLabel(data?.country)} / ${data?.city}`}</span>
                                        <span className={language === 'fa' ? 'me-3' : 'ms-3'} >{`${data?.company}`}</span>
                                        <span className={`${language === 'fa' ? 'me-3' : 'ms-3'} text-wrap`} >{`Responsibilities: ${data?.responsibilities}`}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}