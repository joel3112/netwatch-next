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
# Hook
# ------------------------------------------------------------- #

echo "import React, { useEffect, useState } from 'react';

export type $type = [
  state: number
]

export type $typeHook = (initialState: number) => $type;

const $name: $typeHook = (initialState: number) => {
  const [state, setState] = useState<number>(initialState);

  return [state];
};

export default $name;" > "$path/$name.ts"

# ------------------------------------------------------------- #
# Hook test
# ------------------------------------------------------------- #

echo "import { renderHook, act } from '@testing-library/react';
import $name from '@/hooks/$name/$name';

describe('Tests $name hook', () => {
  test('works hook correctly', () => {
    const { result } = renderHook(() => $name(0));

    expect(result.current).not.toBeEmpty();
	});
});" > "$path/$name.test.ts"

echo "- Hook created successfully in $path"
