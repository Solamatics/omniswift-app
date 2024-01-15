"use client";

import React, { forwardRef, ForwardedRef, useState, useEffect } from "react";
import Image from "next/image";
import ResultTable from "@/app/ui/ResultTable";
import UnitTable from "@/app/ui/UnitTable";

interface DocumentProps {
  data?: {
    firstname: string;
    surname: string;
    level: string;
    reg_no: string;
    session: string;
    profile_picture: string;
    data: {
      id: string;
      result: any[];
      cummulative: any[];
    };
  };
}

const Document: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DocumentProps
> = ({ data }, ref) => {
  const [results, setResults] = useState<any[]>([]);
  const [cummulatives, setCummulatives] = useState<any[]>([]);

  useEffect(() => {
    setResults(data?.data?.result || []);
    setCummulatives(data?.data?.cummulative || []);
  }, [data?.data?.id]);

  return (
    <>
      <div className="flex items-center justify-between gap-6" ref={ref}>
        <div>
          <Image src="/fce-logo.png" width={100} height={100} alt="logo" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#4F4F4F] text-center">
            FREMONT COLLEGE OF EDUCATION
          </h3>
          <p className="text-sm text-[#4F4F4F] text-center">
            No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
          </p>
          <h3 className="text-2xl font-medium text-[#333] text-center">
            Post Graduate Diploma in Education
          </h3>
          <p className="text-sm font-bold text-[#333] text-center">
            Student First Semester Statement Of Result
          </p>
        </div>
        <div>
         {data && <Image
            src={data.profile_picture}
            height={100}
            width={100}
            alt="Profile"
          />}
        </div>
      </div>
      <div>
        <div>
          <p>
            Name: {data?.firstname} {data?.surname}
          </p>
          <p>Level: {data?.level}</p>
        </div>
        <div>
          <p>Reg No: {data?.reg_no}</p>
          <p>Session: {data?.session}</p>
        </div>
      </div>

      <ResultTable results={results} />
      <UnitTable cummulatives={cummulatives} />
    </>
  );
};

export default forwardRef(Document);
