import { Inject, Injectable } from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class EncoderService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: WinstonLogger) {}

  encodeV1(s: string): { encodedString: string; elapsed: number } {
    const start = new Date().getTime();

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

    return {
      encodedString,
      elapsed: new Date().getTime() - start
    };
  }

  encodeV2(s: string): { encodedString: string; elapsed: number } {
    const start = new Date().getTime();

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

    return {
      encodedString: encodedArr.join(''),
      elapsed: new Date().getTime() - start
    };
  }

  encodeV3(s: string): { encodedString: string; elapsed: number } {
    const start = new Date().getTime();

    const encodedArr = s.split('').reduce((acc, char, i, arr) => {
      if (char !== arr[i - 1]) acc.push(`${char}${arr.slice(i).indexOf(char)}`);

      return acc;
    }, []);

    return {
      encodedString: encodedArr.join(''),
      elapsed: new Date().getTime() - start
    };
  }

  encodeV4(s: string): { encodedString: string; elapsed: number } {
    const start = new Date().getTime();

    const encodedString = s.replace(
      /(.)\1*/g,
      (match, char) => `${char}${match.length}`
    );

    console.log(encodedString);

    return {
      encodedString,
      elapsed: new Date().getTime() - start
    };
  }
}
