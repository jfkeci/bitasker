import { Inject, Injectable } from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { EncodedStringResponse } from '../responses/encoded-string.response';

@Injectable()
export class EncoderService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: WinstonLogger) {}

  encodeV1(s: string): EncodedStringResponse {
    let encodedString = '';
    let prevChar = s[0];
    let count = 1;

    for (let i = 1; i < s.length; i++) {
      let char = s[i];

      if (char === prevChar) {
        count += 1;
      } else {
        encodedString += prevChar + count.toString();

        prevChar = char;

        count = 1;
      }
    }

    encodedString += prevChar + count.toString();

    return { text: encodedString };
  }

  encodeV2(s: string): EncodedStringResponse {
    const encodedArr = [];
    let prevChar = s[0];
    let count = 1;

    for (let i = 1; i < s.length; i++) {
      const char = s[i];

      if (char === prevChar) {
        count++;
      } else {
        encodedArr.push(`${prevChar}${count}`);

        prevChar = char;

        count = 1;
      }
    }

    encodedArr.push(`${prevChar}${count}`);

    return { text: encodedArr.join('') };
  }

  encodeV3(s: string): EncodedStringResponse {
    return {
      text: s
        .split('')
        .reduce((acc, char, i, arr) => {
          if (char !== arr[i - 1])
            acc.push(`${char}${arr.slice(i).indexOf(char)}`);

          return acc;
        }, [])
        .join('')
    };
  }

  encodeV4(s: string): EncodedStringResponse {
    return {
      text: s.replace(/(.)\1*/g, (match, char) => `${char}${match.length}`)
    };
  }
}
