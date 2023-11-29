import { deepCloneObj } from './deepClone'
import { countyMappingData, electionsConfig } from '../consts/electionsConifg'
import {
  fetchPresidentEvcData,
  fetchPresidentMapData,
  fetchMayorEvcData,
  fetchMayorMapData,
  fetchCouncilMemberEvcData,
  fetchSeatData,
  fetchCouncilMemberMapData,
  fetchReferendumEvcData,
  fetchReferendumMapData,
} from './fetchElectionData'

/**
 * @typedef {{isRunning: boolean, isStarted: boolean, [key: number]: null | Object}} ModuleData
 *
 * Representing the data for an election in a year. For referendum it represents the data in one number(案號).
 * @typedef {Object} ElectionData
 * @property {ModuleData} mapData
 * @property {ModuleData} evcData
 * @property {ModuleData} seatData
 *
 * @typedef {{[key: number]: {
 * normal: ElectionData
 * mountainIndigenous : ElectionData
 * plainIndigenous : ElectionData
 * party: ElectionData}}} YearlyLegislatorElectionData
 *
 * @typedef {Object} YearlyCouncilMemberSubtypeElectionData
 * @property {ModuleData} mapData
 * @property {ModuleData} evcData
 * @property {ModuleData} seatData
 *
 * @typedef {{[key: number]: {
 * normal: ElectionData
 * indigenous : ElectionData}}} YearlyCouncilMemberElectionData
 *
 *
 * @typedef {{[key: number]: {[key: string]: ElectionData}}} YearlyReferendumElectionData
 *
 * @typedef {{[key: number]: ElectionData}} PresidentElectionData
 * @typedef {{[key: number]: ElectionData}} MayorElectionData
 * @typedef {{[key: number]: YearlyLegislatorElectionData}} LegislatorElectionData
 * @typedef {{[key: number]: YearlyCouncilMemberElectionData}} CouncilMemberElectionData
 * @typedef {{[key: number]: YearlyReferendumElectionData}} ReferendumElectionData
 *
 * @typedef {Object} ElectionsData
 * @property {PresidentElectionData} president - President election data.
 * @property {MayorElectionData} mayor - Mayor election data.
 * @property {LegislatorElectionData} legislator - Legislator election data.
 * @property {CouncilMemberElectionData} councilMember - Council Member election data.
 * @property {ReferendumElectionData} referendum - Referendum election data.
 *
 * @typedef {import('../consts/electionsConifg').ElectionType} ElectionType
 *
 * @typedef {Object} InfoboxData
 * @property {ElectionType} electionType
 * @property {0 | 1 | 2 | 3} level
 * @property {Object} electionData
 * @property {boolean} isRunning
 * @property {boolean} isStarted
 * */

/** @type {ModuleData} */
export const defaultData = {
  isRunning: false,
  isStarted: true,
  0: null,
  1: {},
  2: {},
}

export const defaultElectionData = {
  mapData: defaultData,
  evcData: defaultData,
  seatData: defaultData,
}

/* electionsData
 {
   president: {
     2020: {
       mapData: {
         isRunning: false,
         isStarted: false,
         0: countryMapData,
         1: {
           [countyId]: countyMapData
         },
         2: {
           [townId]: townMapData
         }
       },
       evcData {
         isRunning: false,
         0: countryEvcData,
         1: {},
         2: {}
       },
       seatData {
         isRunning: false,
         0: null,
         1: {},
         2: {}
       },
     }
   },
   mayor: {
     2022: {
       mapData: {
         isRunning: false,
         isStarted: false,
         0: countryMapData,
         1: {
           [countyId]: countyMapData
         },
         2: {
           [townId]: townMapData
         }
       }
       evcData {
         isRunning: false,
         0: countryEvcData,
         1: {},
         2: {}
       }
       seatData {
         isRunning: false,
         0: null,
         1: {},
         2: {}
       },
     }
   },
   legislator: {
     2020: {
       normal: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           0: null,
           1: {
             [countyId]: countyEvcData
           },
           2: {}
         }
         seatData {
           isRunning: false,
           0: countrySeatData,
           1: {},
           2: {}
         },
       },
       indigenous: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           isStarted: false,
           0: null,
           1: {
             [countyId]: countyEvcData
           },
           2: {}
         }
         seatData {
           isRunning: false,
           0: countrySeatData,
           1: {},
           2: {}
         },
       }
     },
   },
   legislatorParty: {
     2020: {
       mapData: {
         isRunning: false,
         isStarted: false,
         0: countryMapData,
         1: {
           [countyId]: countyMapData
         },
         2: {
           [townId]: townMapData
         }
       }
       evcData {
         isRunning: false,
         0: countryEvcData,
         1: {},
         2: {}
       }
       seatData {
         isRunning: false,
         0: null,
         1: {},
         2: {}
       },
     }
   },
   councilMember: {
     2022: {
       normal: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           0: null,
           1: {
             [countyId]: countyEvcData
           },
           2: {}
         }
         seatData {
           isRunning: false,
           0: null,
           1: {
             [countyId]: countySeatData
           },
           2: {}
         },
       },
       indigenous: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           0: null,
           1: {
             [countyId]: countyEvcData
           },
           2: {}
         }
         seatData {
           isRunning: false,
           0: null,
           1: {
             [countyId]: countySeatData
           },
           2: {}
         },
       }
     },
   },
   referendum: {
     2022: {
       F1: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           0: countryEvcData,
           1: {},
           2: {}
         }
         seatData {
           isRunning: false,
           0: null,
           1: {},
           2: {}
         },
       }
     },
   },
   referendumLocal: {
     2021: {
       hsinchu: {
         mapData: {
           isRunning: false,
           isStarted: false,
           0: countryMapData,
           1: {
             [countyId]: countyMapData
           },
           2: {
             [townId]: townMapData
           }
         }
         evcData {
           isRunning: false,
           0: countryEvcData,
           1: {},
           2: {}
         }
         seatData {
           isRunning: false,
           0: null,
           1: {},
           2: {}
         },
       }
     }
   }
 }
*/
/**
 * Generate the default electionsData to store all election-related data later.
 * Check the comment above to see the sample of data structure.
 * @returns {ElectionsData}
 */
export const generateDefaultElectionsData = () => {
  // @ts-ignore
  return electionsConfig.reduce((electionsData, election) => {
    const { electionType, years } = election
    let singleElectionData
    switch (electionType) {
      case 'president':
      case 'mayor': {
        singleElectionData = years.reduce((obj, { key }) => {
          obj[key] = deepCloneObj(defaultElectionData)
          return obj
        }, {})
        break
      }

      case 'legislator':
      case 'councilMember': {
        const { subtypes } = election
        singleElectionData = years.reduce((obj, { key }) => {
          obj[key] = subtypes.reduce((obj, { key }) => {
            obj[key] = deepCloneObj(defaultElectionData)
            return obj
          }, {})
          return obj
        }, {})
        break
      }

      case 'referendum': {
        singleElectionData = years.reduce((obj, { key, numbers }) => {
          obj[key] = numbers.reduce((obj, { key }) => {
            obj[key] = deepCloneObj(defaultElectionData)
            return obj
          }, {})
          return obj
        }, {})
        break
      }
      default:
        break
    }
    electionsData[electionType] = singleElectionData
    return electionsData
  }, {})
}

/**
 * Add the electionData to the big electionsData by it's year, subtype and number depending on the election.
 * @param {ElectionsData} electionsData
 * @param {ElectionData} newElectionData
 * @param {ElectionType} electionType
 * @param {number} yearKey - The year of the newElectionData
 * @param {string} [subtypeKey] - The key of subtype of the election
 * @param {string} [numberKey] - The key of referendum number
 * @returns
 */
export const updateElectionsData = (
  electionsData,
  newElectionData,
  electionType,
  yearKey,
  subtypeKey,
  numberKey
) => {
  switch (electionType) {
    case 'president':
    case 'mayor': {
      electionsData[electionType][yearKey] = newElectionData
      break
    }

    case 'legislator':
    case 'councilMember': {
      electionsData[electionType][yearKey][subtypeKey] = newElectionData
      break
    }

    case 'referendum': {
      electionsData[electionType][yearKey][numberKey] = newElectionData
      break
    }
    default:
      break
  }
  return electionsData
}

/**
 * Retrieve an electionData from the given year, subtype and number.
 * @param {ElectionsData} electionsData
 * @param {ElectionType} electionType
 * @param {number} yearKey - The year of the newElectionData
 * @param {string} [subtypeKey] - The key of subtype of the election
 * @param {string} [numberKey] - The key of referendum number
 * @returns {ElectionData}
 */
export const getElectionData = (
  electionsData,
  electionType,
  yearKey,
  subtypeKey,
  numberKey
) => {
  let electionData
  switch (electionType) {
    case 'president':
    case 'mayor': {
      electionData = electionsData[electionType][yearKey]
      break
    }

    case 'legislator':
    case 'councilMember': {
      electionData = electionsData[electionType][yearKey][subtypeKey]
      break
    }

    case 'referendum': {
      electionData = electionsData[electionType][yearKey][numberKey]
      break
    }
    default:
      break
  }

  return electionData
}

export const prepareElectionData = async (
  /** @type {import('../utils/electionsData').ElectionData} */ electionData,
  /** @type {import('../consts/electionsConifg').ElectionConfig} */ electionConfig,
  /** @type {import('../hook/useElectinData').LevelControl} */ levelControl,
  /** @type {number} */ yearKey,
  /** @type {string} */ subtypeKey,
  /** @type {string} */ numberKey,
  /** @type {string} */ lastUpdate,
  /** @type {boolean} */ compareMode,
  /** @type {boolean} */ isRefetching = false
) => {
  const newElectionData = electionData
  let {
    mapData: newMapData,
    evcData: newEvcData,
    seatData: newSeatData,
  } = newElectionData
  const { level: currentLevel, townCode, countyCode } = levelControl
  const { electionType } = electionConfig
  let newLastUpdate = lastUpdate

  /** @type {InfoboxData} */
  const newInfoboxData = {
    electionType,
    level: currentLevel,
    electionData: {},
    isRunning: false,
    isStarted: true,
  }

  for (let level = 0; level <= currentLevel; level++) {
    switch (electionType) {
      case 'president':
        switch (level) {
          case 0:
            // handle evcData
            // evc will not show in compare mode
            if (!compareMode) {
              // fetch evcData if in refetch mode or no specific evc data
              if (isRefetching || (!isRefetching && !newEvcData[level])) {
                try {
                  const data = await fetchPresidentEvcData({
                    yearKey,
                  })
                  newEvcData[level] = data
                } catch (error) {
                  console.error(error)
                }
              }
            }

            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (isRefetching || (!isRefetching && !newMapData[level])) {
              try {
                const data = await fetchPresidentMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: electionConfig.meta.map.fileNames[level],
                })
                newMapData[level] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[level]?.summary
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted
            break
          case 1:
            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][countyCode])
            ) {
              try {
                const data = await fetchPresidentMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: countyCode,
                })
                newMapData[level][countyCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[0]?.districts.find(
              (district) => district.county === levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted
            break
          case 2:
            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][townCode])
            ) {
              try {
                const data = await fetchPresidentMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: townCode,
                })
                newMapData[level][townCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[1][
              countyCode
            ]?.districts.find(
              (district) =>
                district.county + district.town === levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted
            break
          case 3:
            // handle infobox data only
            newInfoboxData.electionData = newMapData[2][
              townCode
            ]?.districts.find(
              (district) =>
                district.county + district.town + district.vill ===
                levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted
            break

          default:
            break
        }
        break
      case 'mayor':
        switch (level) {
          case 0:
            // handle evc data
            // evc will not show in compare mode
            if (!compareMode) {
              // fetch evcData if in refetch mode or no specific evc data
              if (isRefetching || (!isRefetching && !newEvcData[level])) {
                try {
                  const data = await fetchMayorEvcData({
                    yearKey,
                  })
                  newEvcData[level] = data
                } catch (error) {
                  console.error(error)
                }
              }
            }

            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (isRefetching || (!isRefetching && !newMapData[level])) {
              try {
                const data = await fetchMayorMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: electionConfig.meta.map.fileNames[level],
                })
                newMapData[level] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }
            break
          case 1:
            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][countyCode])
            ) {
              try {
                const data = await fetchMayorMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: countyCode,
                })
                newMapData[level][countyCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox
            newInfoboxData.electionData = newMapData[0]?.districts.find(
              (district) => district.county === levelControl.activeCode
            )
            // to-be-updated when data is available
            if (
              !newInfoboxData.electionData &&
              yearKey === 2022 &&
              countyCode === '10020'
            ) {
              // 2022 chiayi city postpond the mayor election
              newInfoboxData.electionData = '10020'
            }
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted
            break
          case 2:
            // handle map data
            // fetch mapData if in refetch mode or no specific mpa data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][townCode])
            ) {
              try {
                const data = await fetchMayorMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: townCode,
                })
                newMapData[level][townCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[1][
              countyCode
            ]?.districts.find(
              (district) =>
                district.county + district.town === levelControl.activeCode
            )
            // to-be-updated when data is available
            if (
              !newInfoboxData.electionData &&
              yearKey === 2022 &&
              countyCode === '10020'
            ) {
              // 2022 chiayi city postpond the mayor election
              newInfoboxData.electionData = '10020'
              break
            }
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 3:
            // handle infobox data only
            newInfoboxData.electionData = newMapData[2][
              townCode
            ]?.districts.find(
              (district) =>
                district.county + district.town + district.vill ===
                levelControl.activeCode
            )
            // to-be-updated when data is available
            if (
              !newInfoboxData.electionData &&
              yearKey === 2022 &&
              countyCode === '10020'
            ) {
              // 2022 chiayi city postpond the mayor election
              newInfoboxData.electionData = '10020'
              break
            }
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break

          default:
            break
        }

        break
      case 'legislator':
        // to be implemented
        break
      case 'councilMember':
        switch (level) {
          case 0:
            break
          case 1:
            // handle evc data
            // evc will not show in compare mode
            if (!compareMode) {
              // fetch evcData if in refetch mode or no specific evc data
              if (
                isRefetching ||
                (!isRefetching && !newEvcData[level][countyCode])
              ) {
                try {
                  const data = await fetchCouncilMemberEvcData({
                    yearKey,
                    district: countyMappingData.find(
                      (countyData) => countyData.countyCode === countyCode
                    ).countyNameEng,
                    subtypeKey,
                  })
                  newEvcData[level][countyCode] = data
                } catch (error) {
                  console.error(error)
                }
              }
            }

            // handle seat data
            // seat chart will not show in compare mode
            if (!compareMode) {
              // fetch seatData if in refetch mode or no specific seat data
              if (
                isRefetching ||
                (!isRefetching && !newSeatData[level][countyCode])
              ) {
                try {
                  const data = await fetchSeatData({
                    electionType,
                    yearKey,
                    folderName: 'county',
                    fileName: countyCode,
                  })
                  newSeatData[level][countyCode] = data
                } catch (error) {
                  console.error(error)
                }
              }
            }

            // handle map data
            // fetch mapData if in refetch mode or no specific map data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][countyCode])
            ) {
              try {
                const data = await fetchCouncilMemberMapData({
                  electionType,
                  yearKey,
                  subtypeKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: countyCode,
                })
                newMapData[level][countyCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infoboxData
            newInfoboxData.electionData = newMapData[1][countyCode]?.summary
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 2:
            // handle map data
            // fetch mapData if in refetch mode or no specific map data
            if (isRefetching || (!isRefetching && !newMapData[2][townCode])) {
              try {
                const data = await fetchCouncilMemberMapData({
                  electionType,
                  yearKey,
                  subtypeKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: townCode,
                })
                newMapData[level][townCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[1][
              countyCode
            ]?.districts.filter(
              (district) =>
                district.county + district.town === levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 3:
            // handle infobox data
            newInfoboxData.electionData = newMapData[2][
              townCode
            ]?.districts.filter(
              (district) =>
                district.county + district.town + district.vill ===
                levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break

          default:
            break
        }
        break
      case 'referendum':
        switch (level) {
          case 0:
            // handle evc data
            // evc will not show in compare mode
            if (compareMode) {
              // fetch evcData if in refetch mode or no specific evc data
              if (isRefetching || (!isRefetching && !newEvcData[level])) {
                try {
                  const data = await fetchReferendumEvcData({
                    yearKey,
                  })
                  newEvcData[level] = data
                } catch (error) {
                  console.error(error)
                }
              }
            }

            // handle map data
            // fetch mapData if in refetch mode or no specific map data
            if (isRefetching || (!isRefetching && !newMapData[level])) {
              try {
                const data = await fetchReferendumMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: electionConfig.meta.map.fileNames[level],
                  numberKey,
                })
                newMapData[level] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[0]?.summary
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 1:
            // handle map data
            // fetch mapData if in refetch mode or no specific map data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][countyCode])
            ) {
              try {
                const data = await fetchReferendumMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: countyCode,
                  numberKey,
                })
                newMapData[level][countyCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[0]?.districts.find(
              (district) => district.county === levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 2:
            // handle map data
            // fetch mapData if in refetch mode or no specific map data
            if (
              isRefetching ||
              (!isRefetching && !newMapData[level][townCode])
            ) {
              try {
                const data = await fetchReferendumMapData({
                  electionType,
                  yearKey,
                  folderName: electionConfig.meta.map.folderNames[level],
                  fileName: townCode,
                  numberKey,
                })
                newMapData[level][townCode] = data
                newMapData.isRunning = data.is_running
                newMapData.isStarted = data.is_started
                newLastUpdate = data.updatedAt
              } catch (error) {
                console.error(error)
              }
            }

            // handle infobox data
            newInfoboxData.electionData = newMapData[1][
              countyCode
            ]?.districts.find(
              (district) =>
                district.county + district.town === levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break
          case 3:
            // handle infobox data
            newInfoboxData.electionData = newMapData[2][
              townCode
            ]?.districts.find(
              (district) =>
                district.county + district.town + district.vill ===
                levelControl.activeCode
            )
            newInfoboxData.isRunning = newMapData.isRunning
            newInfoboxData.isStarted = newMapData.isStarted

            break

          default:
            break
        }
        break

      default:
        break
    }
  }

  return {
    newElectionData,
    newInfoboxData,
    newLastUpdate,
  }
}
