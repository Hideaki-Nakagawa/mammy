const FoodKind = {
  Vitamin: 0,
  Protein: 1,
  Carbohydrate: 2,
  Other: 3,
} as const;

const AllowType = {
  OK: 0,
  FAIR: 1,
  NG: 2,
} as const;

type FoodKind = typeof FoodKind[keyof typeof FoodKind];

const TermType = {
  TypeA: [
    {
      gokkun: AllowType.OK, //〇
      mogmog: AllowType.OK, //〇
      kamikami: AllowType.OK, //〇
      pakupaku: AllowType.OK, //〇
    },
  ],
  TypeB: [
    {
      gokkun: AllowType.FAIR, //△
      mogmog: AllowType.OK, //〇
      kamikami: AllowType.OK, //〇
      pakupaku: AllowType.OK, //〇
    },
  ],
  TypeC: [
    {
      gokkun: AllowType.FAIR, //△
      mogmog: AllowType.FAIR, //△
      kamikami: AllowType.OK, //〇
      pakupaku: AllowType.OK, //〇
    },
  ],
  TypeD: [
    {
      gokkun: AllowType.FAIR, //△
      mogmog: AllowType.FAIR, //△
      kamikami: AllowType.OK, //〇
      pakupaku: AllowType.OK, //〇
    },
  ],
};

const FoodsData = {
  foods: [
    {
      name: "にんじん",
      kind: FoodKind.Vitamin,
      Term: TermType.TypeA,
    },
  ],
};

export default FoodsData;
