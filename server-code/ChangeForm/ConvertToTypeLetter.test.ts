import { convertToTypeLetter } from './ChangeForm'

test('Converts New Function to N', () => {
  expect(convertToTypeLetter('New Function')).toBe('N');
});
