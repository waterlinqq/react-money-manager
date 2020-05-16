import React, { useRef, useEffect, FC } from 'react'
import Chartjs from 'chart.js'

import classes from './Chart.module.scss'

interface IProps {
  monthData: { [d: number]: number }
  total: number
}

const Chart: FC<IProps> = ({ monthData, total }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!
    const labels = Object.keys(monthData)
    const data = Object.values(monthData)
    // tslint:disable-next-line: no-unused-expression
    new Chartjs(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3',
            fill: false,
            borderWidth: 0.5,
          },
        ],
        labels,
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    })
  }, [monthData])
  return (
    <div className={classes.Chart}>
      <span className={classes.Total}>{total}</span>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Chart
