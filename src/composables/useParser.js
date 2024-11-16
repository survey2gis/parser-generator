import { DEFAULT_VALUES } from '../constants/parser'
import { ref } from 'vue'

export function useParser() {
  const parserSection = ref({
    info: '',
    name: '',
    comment_mark: DEFAULT_VALUES.comment_mark,
    coor_x: DEFAULT_VALUES.coor_x,
    coor_y: DEFAULT_VALUES.coor_y,
    coor_z: DEFAULT_VALUES.coor_z,
    geom_tag_point: DEFAULT_VALUES.geom_tag_point,
    geom_tag_line: DEFAULT_VALUES.geom_tag_line,
    geom_tag_poly: DEFAULT_VALUES.geom_tag_poly,
    key_field: '',
    key_unique: 'No',
    no_data: DEFAULT_VALUES.no_data,
    tag_field: '',
    tagging_mode: 'none',
    tag_strict: 'No'
  })

  const resetParser = () => {
    Object.keys(parserSection.value).forEach(key => {
      parserSection.value[key] = DEFAULT_VALUES[key] || ''
    })
  }

  return {
    parserSection,
    resetParser
  }
}