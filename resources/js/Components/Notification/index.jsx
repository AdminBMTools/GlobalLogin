import { useEffect, useState, useRef } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Badge } from 'primereact/badge'
import { Tooltip } from 'primereact/tooltip'

export default function Notification ( {user_id} ) {
  const [ numberNotify, setNumberNotify ] = useState(0)
  const [ notifications, setNotifications ] = useState([])
  const [ trigger, setTrigger ] = useState(true)
  const op = useRef(null)

  useEffect(() => {
    if( trigger ){
      fetch(`/api/get/notify/${user_id}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data)
        setNumberNotify(data.length)
        setTrigger(false)
      })
    }
  }, [trigger])

  useEffect(() => {
    const interval = setInterval(() => setTrigger(true), 1000)
    return () => clearInterval(interval)
  }, [])

  const readBodyTemplate = (rowData) => {
    return <button className='rounded-full border border-green-500 text-green-500 hover:bg-green-100 tp' onClick={() => {
      fetch(`/api/delete/notify`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({id: rowData.id})
      })
        .then(res => res.json())
        .then(data => {
          data.message === 'success' ? setTrigger(true) : console.log('Error')
        })
    }}> 
      <Tooltip target=".tp" content='Marcar como leído' />
      <i className='pi pi-check p-2' style={{'fontSize': '.8rem'}}></i>
    </button>
  }

  return(
    <>
      <button className="rounded-full mx-4 bg-indigo-500 text-white hover:bg-indigo-600" onMouseOver={(e) => op.current.toggle(e)}>
        <i className="pi pi-bell p-3 p-overlay-badge">
          <Badge value={numberNotify} severity='danger'></Badge>
        </i>
      </button>
      <OverlayPanel ref={op} showCloseIcon id='overlay' style={{width: '20rem'}} onMouseLeave={(e) => op.current.toggle(e)}>
        <DataTable value={notifications} size='small' emptyMessage="No hay notificaciones">
          <Column field='message'/>
          <Column headerStyle={{ width: '10%', minWidth: '8rem', backgroundColor: 'white' }} bodyStyle={{ textAlign: 'center' }}
          body={readBodyTemplate}></Column>
        </DataTable>
      </OverlayPanel>
    </>
  )
}