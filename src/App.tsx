import React from 'react';
import './App.css';
import LinkedIn from './assets/images/linkedin.svg';
import Quora from './assets/images/quora.svg';
// import Twitter from './assets/images/twitter.svg';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="App">
            <div className={'container'}>
                <Dashboard/>
            </div>
            <footer className="App-footer">
                <a
                    className="App-link"
                    href="https://www.linkedin.com/in/niyati-garg-59b385211"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={LinkedIn} alt={'linkedIn'}/>
                </a>
                <a
                    className="App-link"
                    href="https://www.quora.com/profile/Niyati-Garg-9?ch=10&oid=1221246088&share=625d0680&srid=u736kJ&target_type=user"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={Quora} alt={'Quora'}/>
                </a>
                <a
                    className="App-link"
                    href="https://twitter.com/garg4_niyati?t=9w4gtwHxQxn6oS0Pz8Pt2g&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {/*<img src={Twitter} alt={'Twitter'}/>*/}
                    <img className="XNo5Ab"
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAeFBMVEUAAAAcl+8cm/Adm/Adm/AdmvAdmvEYl+8Qn+8bmu8bme8em/Ecme8dmu8emvAgl+8bmu8cm/Acm/EdnPAem/AcmvAdnO8dmu8cmu8Zme8ZnO8gn+8em+8cm+8cmu8gmu8enPAeme8cm+8em+8dmu8dmu8dme8gn++31JfqAAAAKHRSTlMAQL/v/9+fIBBgcH+AsN8gMM9/3++vUGCQUFAgcODAMN9wQIDQwKAQsFNO+QAAALZJREFUeAHUzsUBhEAUA9AMZN3dcei/Q5zxBvYdvwZ/SgQhZ/MFALFEb7WGZsPBdh3MMdhxDWlFaX84onciz5hcOLneLnc5wJlAT1DzwODJTvCyPvCN0efKXnhbizOVA0bLL72WGP2CCz1CTJ70ijCJ6fWE5M9whPJI/B+k9Hml7QFNRscchpyW/QGmR0FDBkd89QWQ4nNI6ZpBd19t5xdqSud/abQzuD7prriS16JKm6kPxXwGAM9DDGV/J75tAAAAAElFTkSuQmCC"
                         style={{height: 22, width: 22}} alt="" data-atf="1" data-frt="0"
                    />
                </a>
            </footer>
        </div>
    );
}

export default App;