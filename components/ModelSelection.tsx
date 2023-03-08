"use client"
import useSWR from "swr"
import Select from "react-select"

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json())

export default function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels)
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  })

  return (
    <div>
      <Select
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "text-white bg-gray-700 border-none h-[50px]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}
