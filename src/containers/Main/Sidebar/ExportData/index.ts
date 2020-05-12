import { IRecord } from 'typings'
import { trans } from 'utils/other'
/**
 * Export records to csv string format and download the csv file.
 * @param rows money records to be transfromed
 */
export const exportData = (rows: IRecord[]) => {
  const flatRows = rows.map((row) => [
    row.category,
    row.amount,
    row.date,
    row.mark,
    trans(row.type),
  ])
  flatRows.unshift(['類型', '金額', '日期', '備註', '分類'])
  const csvStr = flatRows.reduce(
    (str, row) => (str += row.join(',') + '\r\n'),
    ''
  )
  const encodedUri = encodeURIComponent(csvStr)
  const link = document.createElement('a')
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri)
  link.setAttribute('download', 'download.csv')
  document.body.appendChild(link)
  link.click()
}
