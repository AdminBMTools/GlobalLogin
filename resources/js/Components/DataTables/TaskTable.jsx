import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { addLocale } from 'primereact/api'
import { FilterMatchMode } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { Calendar } from 'primereact/calendar'
import { useState } from 'react'


export default function TaskTable ({data}) {
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

  return(
    <>
      <DataTable value={data} responsiveLayout="scroll" size='small'
        rows={20} scrollable style={{fontSize: '0.85rem'}}>
        <Column header='Fecha Inicio' body={dateBodyTemplate} field='fecha_inicio' dataType='date' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}}/>
        <Column header='Fecha Compromiso' body={dateBodyTemplate2} field='fecha_compromiso' dataType='date' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}}/>
        <Column header='Descripcion' field='descripcion' showFilterMenu={false} headerStyle={{backgroundColor: 'white'}}/>
        <Column header='Progreso' body={progresoBodyTemplate} field='progreso' showFilterMenu={false} className='w-[10rem] mx-auto' headerStyle={{backgroundColor: 'white'}}/>
        <Column header='Prioridad' body={prioridadBodyTemplate} field='prioridad' showFilterMenu={false} className='w-[10rem] mx-auto' headerStyle={{backgroundColor: 'white'}}/>
      </DataTable>
    </>
  )

}