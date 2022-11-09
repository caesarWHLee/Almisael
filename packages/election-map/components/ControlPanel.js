import styled from 'styled-components'

const Wrapper = styled.div`
  & * {
    pointer-events: auto;
  }
`

const ElectionSelect = styled.select`
  margin: 36px 0 0 60px;
`

const MapLevelBackButton = styled.button`
  display: block;
  margin: 20px 0 0 48px;
  border: 1px solid #000;
  background-color: #686868;
  color: #fff1db;
  border-radius: 8px;
  line-height: 23px;
  text-align: center;
  width: 80px;
  height: 32px;

  &:hover,
  &:active {
    background-color: #000;
  }
`

const MapLevelResetButton = styled.button`
  display: block;
  margin: 20px 0 0 48px;
  border: 1px solid #000;
  background-color: #686868;
  color: #fff1db;
  border-radius: 8px;
  line-height: 23px;
  text-align: center;
  width: 80px;
  height: 32px;

  &:hover,
  &:active {
    background-color: #000;
  }
`

const LocationsWrapper = styled.div`
  margin: 13px 0 0 48px;
`

const Location = styled.span`
  margin-right: 16px;
  font-size: 24px;
  line-height: 34.75px;
  &:last-of-type {
    font-weight: 900;
    margin-right: unset;
  }
`

export const ControlPanel = ({
  electionNamePairs,
  onElectionChange,
  mapObject,
}) => {
  const { countyName, townName, constituencyName, villageName } = mapObject
  const locations = [
    countyName,
    townName,
    constituencyName,
    villageName,
  ].filter((name) => !!name)
  if (!locations.length) locations.push('全國')
  return (
    <Wrapper>
      <ElectionSelect name="election-type" onChange={onElectionChange}>
        {electionNamePairs.map((electionNamePair) => (
          <option
            value={electionNamePair.electionType}
            key={electionNamePair.electionType}
          >
            {electionNamePair.electionName}
          </option>
        ))}
      </ElectionSelect>
      <MapLevelBackButton
        disabled={mapObject.level === 0}
        onClick={() => {
          const target = document.querySelector(
            `#first-id-${mapObject.upperLevelId}`
          )
          let event = new MouseEvent('click', { bubbles: true })
          target.dispatchEvent(event)
        }}
      >
        回上層
      </MapLevelBackButton>
      <MapLevelResetButton
        disabled={mapObject.level === 0}
        onClick={() => {
          const target = document.querySelector(`#first-id-background`)
          let event = new MouseEvent('click', { bubbles: true })
          target.dispatchEvent(event)
        }}
      >
        回全國
      </MapLevelResetButton>
      <LocationsWrapper>
        {locations.map((location, i) => (
          <Location key={i}>{location}</Location>
        ))}
      </LocationsWrapper>
    </Wrapper>
  )
}
