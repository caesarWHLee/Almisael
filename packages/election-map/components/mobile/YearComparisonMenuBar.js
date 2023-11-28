import { useState } from 'react'

import styled from 'styled-components'
const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background-color: #fff;
  height: 100dvh;
  padding: 40px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Spot = styled.span`
  position: relative;
  width: 22px;
  height: 22px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 45px;

  &.selected,
  &.selected2 {
    &:before {
      content: '';
      width: 16px;
      height: 16px;
      border: 1px solid #000;
      border-radius: 50%;
    }
  }
  &.selected {
    &:before {
      background-color: #000;
    }
  }
  &.selected2 {
    &:before {
      background-color: #ffc7bb;
    }
  }
  &:after {
    display: block;
    position: absolute;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    top: 50%;
    transform: translateY(50%);
    content: '${
      /**
       *
       * @param {Object} props
       * @param {number} props.yearName
       */
      ({ yearName }) => yearName && `${yearName}`
    }';
  }
`
const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0 0 8px 8px;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
`
const DecideBtn = styled.button`
  border-radius: 8px;
  border: 1px solid black;
  padding: 6px 12px;
  background-color: #dd6f57;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`
/**
 * Note: 有公投ui（比較案件）跟選舉ui（比較年份）
 * @returns
 */
export default function YearComparisonMenuBar({
  years = [{ key: 2024 }],
  selectedYears = [{ key: 2024 }],
  setSelectedYears,
  setShouldOpenYearComparisonMenuBar,
}) {
  const [selectedYearsNew, setSelectedYearsNew] = useState(selectedYears)
  const [firstYear, secondYear] = selectedYearsNew

  const handleOnChooseYears = (year) => {
    if (firstYear.key === year.key) {
      return
    }
    const result = [firstYear, year]

    setSelectedYearsNew(result)
  }
  const handleOnDecide = () => {
    if (!secondYear?.key) {
      return
    }
    setShouldOpenYearComparisonMenuBar(false)
    setSelectedYears([...selectedYearsNew])
  }
  const itemJsx = years.map((year) => {
    let itemClassName = 'radio-button'
    if (firstYear.key === year.key) {
      itemClassName = 'radio-button selected'
    } else if (secondYear?.key === year.key) {
      itemClassName = `radio-button selected2`
    }

    return (
      <Spot
        key={year.key}
        yearName={year.key}
        className={itemClassName}
        onClick={() => handleOnChooseYears(year)}
      ></Spot>
    )
  })
  return (
    <Wrapper>
      <CloseBtn onClick={() => setShouldOpenYearComparisonMenuBar(false)}>
        X
      </CloseBtn>
      {itemJsx}

      <DecideBtn disabled={!secondYear?.key} onClick={handleOnDecide}>
        決定
      </DecideBtn>
    </Wrapper>
  )
}