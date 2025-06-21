"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"

const hospitals = [
  {
    id: 1,
    name: "St. Luke's Medical Center",
    time: "12 min",
    location: "123 Main St, Medford",
    capability: "MRI/CT on-site, Neonatal ICU",
    availability: "ICU beds available, ER Wait Time: 10 min",
    image: "/placeholder.svg?height=60&width=60&text=Hospital",
  },
  {
    id: 2,
    name: "City General Hospital",
    time: "15 min",
    location: "456 Oak Ave, Medford",
    capability: "Trauma Center, Burn Unit",
    availability: "No ICU beds available, ER Wait Time: 30 min",
    image: "/placeholder.svg?height=60&width=60&text=Hospital",
  },
  {
    id: 3,
    name: "Community Health Center",
    time: "18 min",
    location: "789 Pine St, Medford",
    capability: "General Surgery, Pediatrics",
    availability: "ICU beds available, ER Wait Time: 15 min",
    image: "/placeholder.svg?height=60&width=60&text=Hospital",
  },
]

export default function HospitalSelectionPage() {
  const router = useRouter()
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)

  const handleConfirm = () => {
    if (selectedHospital) {
      const hospital = hospitals.find((h) => h.id === selectedHospital)
      localStorage.setItem("selectedHospital", JSON.stringify(hospital))
      router.push("/transport-info")
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/patient-details-2">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold">Hospital Selection</h1>
            <div className="w-6"></div>
          </div>

          <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl mb-6 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p className="text-sm">GPS Location</p>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4">Recommended Hospitals</h2>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              onClick={() => setSelectedHospital(selectedHospital === hospital.id ? null : hospital.id)}
              className={`p-4 rounded-xl cursor-pointer transition-colors ${
                selectedHospital === hospital.id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={hospital.image || "/placeholder.svg"}
                    alt={hospital.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <p className={`text-sm ${selectedHospital === hospital.id ? "text-blue-100" : "text-gray-500"}`}>
                      {hospital.time}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${selectedHospital === hospital.id ? "rotate-180" : ""}`}
                />
              </div>

              {selectedHospital === hospital.id && (
                <div className="mt-4 pt-4 border-t border-blue-400 space-y-2">
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-blue-100">{hospital.location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Capability</p>
                    <p className="text-sm text-blue-100">{hospital.capability}</p>
                  </div>
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-sm text-blue-100">{hospital.availability}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={handleConfirm}
            disabled={!selectedHospital}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium mt-6"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
