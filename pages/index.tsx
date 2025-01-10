import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import expressApi from "@/api/api";

export default function IndexPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateCsv = () => {
    setIsLoading(true);
    expressApi
      .post("/generateCsv", { apiKey })
      .then((res) => {
        setIsLoading(false);
        // 获取 base64 内容
        const base64Content = res.data;

        // 将 base64 转换为 Blob
        const byteCharacters = atob(base64Content);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "text/csv;charset=utf-8;" });

        // 创建下载链接
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(blob);

        // 设置下载属性
        downloadLink.href = url;
        downloadLink.download = "time_entries.csv";

        // 添加到文档并触发下载
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // 清理
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        // 这里可以添加错误提示
        alert("Failed to download CSV file");
      });
  };

  return (
    <DefaultLayout>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your api key"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Button
          color="primary"
          isDisabled={isLoading}
          onClick={handleGenerateCsv}
        >
          {isLoading ? "Processing..." : "Generate csv"}
        </Button>
      </div>
    </DefaultLayout>
  );
}
