export const MANDATORY_FIELDS = {
  parser: ['name', 'coor_x', 'coor_y', 'coor_z'],
  field: ['name', 'type']
}

export const DEFAULT_VALUES = {
  comment_mark: '#',
  coor_x: 'COORX',
  coor_y: 'COORY',
  coor_z: 'COORZ',
  geom_tag_point: '.',
  geom_tag_line: '$',
  geom_tag_poly: '@',
  no_data: '-1'
}

export const DEFAULT_FIELD = {
  name: '',
  change_case: 'lower',
  empty_allowed: 'no',
  info: '',
  merge_separators: 'no',
  persistent: 'no',
  quotation: "'",
  skip: 'no',
  separator: ';',
  type: 'text',
  unique: 'no',
  aliases: ''
}