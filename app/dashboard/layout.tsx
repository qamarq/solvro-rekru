import LayoutContainer from '@/components/layout'
import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar'

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer className='flex gap-8'>
            <DashboardSidebar />
            {children}
        </LayoutContainer>
    )
}
