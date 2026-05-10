# FlowDev Lab — Demos

[FlowDev Lab](https://github.com/tkdwns1245/my-portfolio) 블로그 포스트에 등장하는 코드 데모를 모아둔 저장소입니다. 폴더 이름은 블로그 포스트 슬러그와 1:1 대응합니다.

## Posts

| Date | Folder | Post |
|------|--------|------|
| 2026-05-07 | [2026-05-07-disney-12-principles](./2026-05-07-disney-12-principles) | 디즈니 애니메이션 12 원칙, 코드로 직접 만져보며 이해하기 |

## Conventions

- **폴더 이름**: `YYYY-MM-DD-slug` — 블로그 포스트의 파일명과 동일
- **폴더당 README**: 해당 포스트로 돌아가는 백링크 + 데모 인덱스 포함
- **각 데모는 독립**: 데모마다 자체 `package.json` — StackBlitz 임베드 호환

## Getting Started

각 데모 폴더로 이동해 개별 실행합니다:

```bash
cd 2026-05-07-disney-12-principles/01-squash-and-stretch
npm install
npm run dev
```
