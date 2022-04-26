read -p "- Enter hook name: " name

path="hooks/$name"
type=$(sed '
       h;
       y/quvwxzdermatoglyphicsbfjkn/QUVWXZDERMATOGLYPHICSBFJKN/;
       G;
       s/\(.\)[^\n]*\n.\(.*\)/\1\2/;
     ' <<<$name)
typeHook="${type}Hook"

mkdir -p $path

# ------------------------------------------------------------- #
# Index
# ------------------------------------------------------------- #

echo "export { $name } from '@/hooks/$name/$name';" > "$path/index.ts"


# ------------------------------------------------------------- #
# Hook
# ------------------------------------------------------------- #

echo "import { useEffect, useState } from 'react';

export type $type = [
  state: number
]

export type $typeHook = (initialState: number) => $type;

export const $name: $typeHook = (initialState: number) => {
  const [state, setState] = useState<number>(initialState);

  return [state];
}; > "$path/$name.ts"

# ------------------------------------------------------------- #
# Hook test
# ------------------------------------------------------------- #

echo "import { act, renderHook } from '@testing-library/react';
import { $name } from '@/hooks/$name';

describe('Tests $name hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => $name(0));

    expect(result.current).not.toBeEmpty();
	});
});" > "$path/$name.test.ts"

echo "- Hook created successfully in $path"
