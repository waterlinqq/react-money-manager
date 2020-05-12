import React, { useRef, useEffect, FC } from 'react'
import Chartjs from 'chart.js'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { trans, reverse } from 'utils/other'

import classes from './Chart.module.scss'

import { Spending } from 'typings'

const COLORS = ['#ffda44', '#48c0e3', '#52c5ab', '#f7746d', '#fbb957']

interface IProps {
  categories: Array<[string, number]>
  total: number
  type: Spending
}

const Chart: FC<RouteComponentProps & IProps> = ({
  categories,
  type,
  total,
  history,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!
    if (categories.length > 5) {
      const rest = categories.splice(4)
      const restSum = rest.reduce((accu, item) => accu + item[1], 0)
      categories.push(['其他', restSum])
    }
    const labels = categories.map((item) => item[0])
    const numbers = categories.map((item) => item[1])
    const ratios = numbers.map((n) => ((n / total) * 100).toFixed(1))
    Chartjs.defaults.global!.elements!.arc!.borderWidth = 12
    // tslint:disable-next-line: no-unused-expression
    new Chartjs(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: numbers,
            backgroundColor: COLORS,
            borderWidth: 0,
          },
        ],
        labels,
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          align: 'start',
          labels: {
            boxWidth: 20,
            fontColor: '#999',
            filter: (...args: any) => {
              const legend = args[0]
              return (legend.text = `${legend.text}     ${ratios.shift()}%`)
            },
          },
        },
      },
    })
  }, [categories, total])
  return (
    <div
      className={classes.Chart}
      onClick={() => history.replace(`/overview/${reverse(type)}`)}
    >
      <span>{trans(type)}</span>
      <span className={classes.Total}>{total}</span>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default withRouter(Chart)
