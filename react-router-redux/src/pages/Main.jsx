import classes from "./Main.module.css";

const INTRODUCTION = [
  "건설 장비 Sky는 건축 및 건설 산업에서 사용되는 중장비 및 도구의 배열을 설명하는 데 사용되는 용어입니다. ",
  "이 기계는 건설 프로젝트를 효율적이고 효과적으로 완료하는 데 중요한 역할을 합니다. ",
  "굴착 및 정지 작업에서 철거 및 도로 공사에 이르기까지 건설 과정과 관련된 다양한 작업을 처리하는 데 사용할 수 있는 다양한 건설 비가 있습니다. ",
  "이러한 기계는 불도저, 크레인, 백호와 같은 크고 강력한 장비부터 착암기 및 콘크리트 믹서와 같은 더 작고 전문화된 도구에 이르기까지 다양합니다.",
  "장비의 크기나 유형에 관계없이 이 모든 기계는 건설 프로세스를 더 빠르고 안전하며 효율적으로 만들기 위해 설계되었습니다.",
];

const Main = () => {
  const introduce_tray = INTRODUCTION.map((item, idx) => {
    return <p key={idx}>&nbsp;{item}</p>;
  });

  return (
    <div>
      <p className={classes.introduce_title}>사업 소개</p>
      <section className={classes.introduce_section}>
        <img src="images/constructor/sky-constructor-01.jpg" />
        {introduce_tray}
      </section>
    </div>
  );
};

export default Main;
