import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CryptoJS from 'crypto-js'
import { Head } from "@inertiajs/react"
import { SECRET_KEY, empresa1Url } from '@/helpers'

export default function Home (props) {

  const handlerClick = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'))
    let id = e.target.innerText
    let dataToSend = {email: user.email, password: user.password }
    let email = CryptoJS.AES.encrypt(user.email, SECRET_KEY).toString()
    let password = CryptoJS.AES.encrypt(user.password, SECRET_KEY).toString()
    email = email.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l')
    password = password.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l')
    
    window.location.href = `${empresa1Url}/login?kjnuc875e7=${email}&sd8f46qpa0=${password}`
  }

  return(
    <>
      <AuthenticatedLayout auth={props.auth} errors={props.errors}> <Head title="Dashboard" />
      <section className='lg:px-20 md:px-10 mx-1 h-screen grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1'>
        <section className='px-10 md:block sm:hidden hidden'>
          <div className="my-10 px-5 py-10 h-full grid">
            <div className="place-self-center">
              <h2 className="text-center font-semibold lg:text-7xl md:text-5xl py-4 text-[#17376D]">Bienvenido a </h2>
              <h3 className="text-center font-semibold lg:text-5xl md:text-4xl py-4 text-[#17376D]">Center by BMTools</h3>
            </div>
          </div>
        </section>
        <div className='md:place-self-center border-gray-900 mt-5 shadow-lg py-10 px-20 rounded-lg bg-neutral-200'>
          <button className="relative w-full" onClick={handlerClick}>
            <img src="/empresa1.svg" alt="" className="object-cover h-[15rem] w-[35rem] mb-5"/>
            <div className='absolute h-full w-full top-0 rounded-lg bg-[#434656] opacity-70 transition duration-300 ease-out hover:opacity-0'>
              <p className='text-white font-semibold text-4xl absolute top-1/2 text-center w-full'>Empresa 1</p>
            </div>
          </button>
          <button className="relative w-full"><img src="/empresa2.svg" alt="" className="object-cover h-[15rem] w-[35rem] mb-5"/>
            <div className='absolute h-full w-full top-0 rounded-lg bg-[#434656] opacity-70 transition duration-300 ease-out hover:opacity-0'>
              <p className='text-white font-semibold text-4xl absolute top-1/2 text-center w-full'>Empresa 2</p>
            </div>
          </button>
          <button className="relative w-full hidden"><img src="/empresa3.svg" alt="" className="object-cover h-[15rem] w-[35rem] mb-5"/>
            <div className='absolute h-full w-full top-0 rounded-lg bg-[#434656] opacity-70 transition duration-300 ease-out hover:opacity-0'>
              <p className='text-white font-semibold text-4xl absolute top-1/2 text-center w-full'>Empresa 3</p>
            </div>
          </button>
        </div>
      </section>
      </AuthenticatedLayout>
    </>
  )
}