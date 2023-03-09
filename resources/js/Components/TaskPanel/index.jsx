import { useEffect, useState } from 'react'

function LayoutTask ( { url, count } ) {
  return <a className='lg:flex lg:flex-row gap-4 h-full border-2 border-gray-400 rounded-lg hover:bg-red-100 text-center' href={url}>
      <p className='text-gray-900 xl:text-3xl lg:text-2xl md:text-xl font-semibold mx-auto place-self-center'>Actividades</p>
      <p className='font-semibold xl:text-8xl lg:text-6xl md:text-4xl mx-auto place-self-center text-red-700'>{count}</p>
  </a>
}

function LayoutTaskMini ( { url, label, count } ) {
  return <a className='flex flex-row gap-4 h-full border-2 border-gray-400 rounded-lg hover:bg-sky-50' href={url}>
      <p className='text-gray-900 xl:text-2xl lg:text-xl font-semibold mx-auto place-self-center text-center px-4'>{label}</p>
      <p className='font-semibold xl:text-6xl lg:text-4xl mx-auto place-self-center text-sky-600 px-4'>{count}</p>
  </a>
}

export default function TaskPanel ( {props} ){
  const [ activities, setActivities ] = useState([0, 0, 0])
  useEffect(() => {
    fetch(`/api/get/counttask/${props.auth.user.id}/${props.auth.user.rol}`)
      .then(res => res.json())
      .then(data => setActivities(data))
  }, [])

  return(
    <>
      { props.auth.user.rol < 4 ? <div className='grid grid-cols-2 gap-4 my-4 lg:h-[15rem] md:h-[10rem] sm:h-[9rem] h-[9rem]'>
          <LayoutTask url='/tareas' count={activities[0]} />
          <div className='grid grid-rows gap-2'>
            <LayoutTaskMini url='/tareas/asignadas' label='Actividades Asignadas' count={activities[1]} />
            <LayoutTaskMini url='/tareas/usuarios' label='Actividades de los usuarios' count={activities[2]} />
          </div>
      </div> : <div className='h-[10rem] my-4'><LayoutTask url='/tareas' /></div> }
    </>
  )
}