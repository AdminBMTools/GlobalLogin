import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { addLocale } from 'primereact/api'
import { FilterMatchMode } from 'primereact/api'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useState, useRef } from 'react'
import ShareTask from '../ShareTask'


export default function ColaborativeTable ({data, setTrigger, showToast, props}) {
  const op = useRef(null)
  const [filters] = useState({
    'incio': { value: null, matchMode: FilterMatchMode.DATE_AFTER },
    'descripcion': { value: null, matchMode: FilterMatchMode.IN },
    'final': { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
    'progreso': { value: null, matchMode: FilterMatchMode.IN },
    'prioridad': { value: null, matchMode: FilterMatchMode.IN },
  })

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  })

  //Template 
  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.fecha_inicio)
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) 
  }

  const dateBodyTemplate2 = (rowData) => {
    const date = new Date(rowData.fecha_compromiso)
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) 
  }

  const progresoBodyTemplate = (rowData) => {
    return rowData.progreso === 'En proceso' ? <span className='bg-yellow-100 px-2 py-1 border rounded-md text-yellow-700 border-yellow-700'>En proceso</span>
    : rowData.progreso === 'Finalizada' ? <span className='bg-green-100 px-2 py-1 border rounded-md text-green-700 border-green-700'>Finalizada</span>
    : rowData.progreso === 'No iniciada' ? <span className='bg-blue-100 px-2 py-1 border rounded-md text-blue-700 border-blue-700'>No iniciada</span> 
    : <span className='bg-purple-100 px-2 py-1 border rounded-md text-purple-700 border-purple-700'>No especificado</span>
  }

  const prioridadBodyTemplate = (rowData) => {
    return rowData.prioridad === 'Baja' ? <span className='bg-amber-100 px-4 py-1 border rounded-md text-amber-700 border-amber-700'>Baja</span>
    : rowData.prioridad === 'Media' ? <span className='bg-orange-100 px-4 py-1 border rounded-md text-orange-700 border-orange-700'>Media</span> 
    : rowData.prioridad === 'Alta' ? <span className='bg-red-100 px-4 py-1 border rounded-md text-red-700 border-red-700'>Alta</span>
    : <span className='bg-slate-100 px-4 py-1 border rounded-md text-slate-700 border-slate-700'>No especificada</span>
  }

  const usersBodyTemplate = (rowData) => {
    return (
      <div>
        { rowData.users.map(el => <p key={el} className='border px-1 py-1 text-center m-1 rounded-md border-indigo-500 text-indigo-700 bg-indigo-50 text-[0.75rem] truncate'>{el}</p>) }
      </div>
    )
  }

  //Edit Templates
  const progressItemTemplate = (option) => {
    return option === 'En proceso' ? <span className='bg-yellow-100 px-2 py-1 border rounded-md text-yellow-700 border-yellow-700'>En proceso</span>
    : option === 'Finalizada' ? <span className='bg-green-100 px-2 py-1 border rounded-md text-green-700 border-green-700'>Finalizada</span>
    : option === 'No iniciada' ? <span className='bg-blue-100 px-2 py-1 border rounded-md text-blue-700 border-blue-700'>No iniciada</span> 
    : <span className='bg-purple-100 px-2 py-1 border rounded-md text-purple-700 border-purple-700'>No especificado</span>
  }

  const progressValueTemplate = (option, props) => {
    if(option){
     return(
        option === 'En proceso' ? <span className='bg-yellow-100 px-2 py-1 border rounded-md text-yellow-700 border-yellow-700'>En proceso</span>
        : option === 'Finalizada' ? <span className='bg-green-100 px-2 py-1 border rounded-md text-green-700 border-green-700'>Finalizada</span>
        : option === 'No iniciada' ? <span className='bg-blue-100 px-2 py-1 border rounded-md text-blue-700 border-blue-700'>No iniciada</span> 
        : <span className='bg-purple-100 px-2 py-1 border rounded-md text-purple-700 border-purple-700'>No especificado</span>
     )
    }
    return ( <span>{props.placeholder}</span> )
  }

  const priorityItemTemplate = (option) => {
    return option === 'Baja' ? <span className='bg-amber-100 px-4 py-1 border rounded-md text-amber-700 border-amber-700'>Baja</span>
    : option === 'Media' ? <span className='bg-orange-100 px-4 py-1 border rounded-md text-orange-700 border-orange-700'>Media</span> 
    : option === 'Alta' ? <span className='bg-red-100 px-4 py-1 border rounded-md text-red-700 border-red-700'>Alta</span>
    : <span className='bg-slate-100 px-4 py-1 border rounded-md text-slate-700 border-slate-700'>No especificada</span>
  }

  const priorityValueTemplate = (option, props) => {
    if(option){
      return option === 'Baja' ? <span className='bg-amber-100 px-4 py-1 border rounded-md text-amber-700 border-amber-700'>Baja</span>
        : option === 'Media' ? <span className='bg-orange-100 px-4 py-1 border rounded-md text-orange-700 border-orange-700'>Media</span> 
        : option === 'Alta' ? <span className='bg-red-100 px-4 py-1 border rounded-md text-red-700 border-red-700'>Alta</span>
        : <span className='bg-slate-100 px-4 py-1 border rounded-md text-slate-700 border-slate-700'>No especificada</span>
    }
    return ( <span>{props.placeholder}</span> )
  }

  //Edit 
  const onRowEditComplete = (e) => {
    let updateData = e.newData
    updateData.fecha_inicio = new Date(updateData.fecha_inicio)
    updateData.fecha_inicio.setDate(updateData.fecha_inicio.getDate() + 1)
    updateData.fecha_inicio = updateData.fecha_inicio.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })

    updateData.fecha_compromiso = new Date(updateData.fecha_compromiso)
    updateData.fecha_compromiso.setDate(updateData.fecha_compromiso.getDate() + 1)
    updateData.fecha_compromiso = updateData.fecha_compromiso.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    
    let { uuid, fecha_inicio, fecha_compromiso, titulo, descripcion, comentario, prioridad, progreso } = updateData
    fetch('/api/put/colaborative', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid, fecha_inicio, fecha_compromiso, titulo, descripcion, comentario, prioridad, progreso })
    }).then(res => res.json())
      .then(result => {
        showToast('success', 'Success', 'La Actividad fue actualizada con exito')
        setTrigger(true)
      })
  }

  const progressEditor = (options) => {
    return ( 
      <Dropdown value={options.value} options={['No iniciada', 'En proceso', 'Finalizada', 'No especificado']} placeholder='Progreso' itemTemplate={progressItemTemplate} 
      style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} className="text-sm" panelStyle={{fontSize: '0.85rem'}} valueTemplate={progressValueTemplate} onChange={(e) => options.editorCallback(e.value)}/>
    )
  }

  const priorityEditor = (options) => {
    return ( 
      <Dropdown value={options.value} options={['Alta', 'Baja', 'Media']} placeholder='Prioridad' itemTemplate={priorityItemTemplate} style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}}
        className="text-sm" panelStyle={{fontSize: '0.85rem'}} valueTemplate={priorityValueTemplate} onChange={(e) => options.editorCallback(e.value)}/>
    )
  }

  const textEditor = (options) => {
    return <InputText type="text" placeholder='Descripción' value={options.value} onChange={(e) => options.editorCallback(e.target.value)}
    style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  const dateEditor = (options) => {
    return <Calendar placeholder='Fecha' value={new Date(options.value)} onChange={(e) => options.editorCallback(e.target.value)}
    dateFormat="dd/mm/yy" locale='es' inputStyle={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}} />
  }

  return(
    <>
      <DataTable value={data} responsiveLayout="scroll" size='small' editMode='row' dataKey='id' onRowEditComplete={onRowEditComplete}
        rows={20} scrollable style={{fontSize: '0.85rem'}}>
        <Column header='Usuarios' body={usersBodyTemplate} field='usuarios' showFilterMenu={false}  headerStyle={{backgroundColor: 'white', width: '8rem'}}
        className='w-[8rem]' />
        <Column header='Fecha Inicio' body={dateBodyTemplate} field='fecha_inicio' dataType='date' showFilterMenu={false} 
          headerStyle={{backgroundColor: 'white'}} editor={(options) => dateEditor(options)}/>
        <Column header='Fecha Compromiso' body={dateBodyTemplate2} field='fecha_compromiso' dataType='date' showFilterMenu={false} 
          headerStyle={{backgroundColor: 'white'}} editor={(options) => dateEditor(options)}/>
        <Column header='Titulo' field='titulo' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}} 
          editor={(options) => textEditor(options)} className='w-[8rem] mx-auto'/>
        <Column header='Descripción' field='descripcion' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}} 
          editor={(options) => textEditor(options)}/>
        <Column header='Comentario' field='comentario' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}} 
          editor={(options) => textEditor(options)}/>
        <Column header='Progreso' body={progresoBodyTemplate} field='progreso' showFilterMenu={false} className='w-[8rem] mx-auto' 
          headerStyle={{backgroundColor: 'white'}} editor={(options) => progressEditor(options)}/>
        <Column header='Prioridad' body={prioridadBodyTemplate} field='prioridad' showFilterMenu={false} className='w-[7rem] mx-auto' 
          headerStyle={{backgroundColor: 'white'}} editor={(options) => priorityEditor(options)}/>
        <Column rowEditor headerStyle={{ width: '5%', minWidth: '6rem', backgroundColor: 'white' }} bodyStyle={{ textAlign: 'center' }}
          className='w-[9rem]'></Column>
      </DataTable>
    </>
  )

}