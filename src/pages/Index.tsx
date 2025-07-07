import { GradientText } from "@/components/ui/gradient-text";

const Index = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/img/f5a9700d-f9c3-4da7-ab29-5272ac8e300f.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-tight">
          Подарочные карты <GradientText>Apple</GradientText>
        </h1>
      </div>
    </div>
  );
};

export default Index;
