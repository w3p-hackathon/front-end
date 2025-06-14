import { FileDropInput } from "../../components/scaffold-eth/Input";
import { NextPage } from "next";

const ProducersPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-6">Producers File Upload</h1>
      <FileDropInput />
    </div>
  );
};

export default ProducersPage;
