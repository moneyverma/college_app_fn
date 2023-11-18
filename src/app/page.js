'use client'
import 'bootstrap/dist/css/bootstrap.css'
import CollegeList from '../component/CollegeList'
import ChartContainer from '@/component/ChartContainer'

export default function Home() {


  return (
    <main className="container-fluid">
      <header className="p-3 mx-2 bg-light text-center">
        <h5>College Master</h5>
      </header>
      <div className="row">
        <CollegeList />
      </div>
    </main>
  )
}
