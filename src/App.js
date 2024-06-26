
import React, { useRef } from 'react';

import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function App() {
    const toast = useRef(null);
  
    const items = [
        {
            label: 'Documents',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search'
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];

  return (
    <>
       <h1>
        Example heading
        <Badge bg="secondary" as={Button}>
          New
        </Badge>
      </h1>
      <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <Menu model={items} />
        </div>
    </>
      
    )
}