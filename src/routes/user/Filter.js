/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 26,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { birthDate } = fields
    if (birthDate.length) {
      fields.birthDate = [birthDate[0].format('YYYY-MM-DD'), birthDate[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialBirthDate = []
  if (filter.birthDate && filter.birthDate[0]) {
    initialBirthDate[0] = moment(filter.birthDate[0])
  }
  if (filter.birthDate && filter.birthDate[1]) {
    initialBirthDate[1] = moment(filter.birthDate[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search placeholder="Buscar por nome" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('address', { initialValue: address })(<Search placeholder="Buscar por endereço" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 10 }} sm={{ span: 12 }} id="birthDateRangePicker">
        <FilterItem label="Nascimento">
          {getFieldDecorator('birthDate', { initialValue: initialBirthDate })(<RangePicker
            style={{ width: '100%' }}
            onChange={handleChange.bind(null, 'birthDate')}
            getCalendarContainer={() => {
              return document.getElementById('birthDateRangePicker')
            }}
          />)}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 20 }} sm={{ span: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>Buscar</Button>
            <Button onClick={handleReset}>Limpar</Button>
          </div>
          <div className="flex-vertical-center">
            <Button type="ghost" onClick={onAdd}>Criar</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
