"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, MapPin, Clock, Heart, Droplets, Waves, Cross } from "lucide-react"
import Link from "next/link"

interface PatientData {
  age: string
  gender: string
  symptoms: string[]
  consciousness: string
  pupils: string
  skinCondition: string
}

interface PatientData2 {
  heartRate: string
  bloodPressure: string
  oxygenSaturation: string
  comments: string
}

interface Hospital {
  name: string
  time: string
  location: string
}

export default function TransportInfoPage() {
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [patientData2, setPatientData2] = useState<PatientData2 | null>(null)
  const [hospital, setHospital] = useState<Hospital | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const data1 = localStorage.getItem("patientData")
    const data2 = localStorage.getItem("patientData2")
    const hospitalData = localStorage.getItem("selectedHospital")

    if (data1) setPatientData(JSON.parse(data1))
    if (data2) setPatientData2(JSON.parse(data2))
    if (hospitalData) setHospital(JSON.parse(hospitalData))
  }, [])

  const handleNavigate = () => {
    if (hospital?.location) {
      const encodedAddress = encodeURIComponent(hospital.location)
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      window.open(googleMapsUrl, "_blank")
    }
  }

  const treatmentItems = patientData2?.comments.split("\n").filter((item) => item.trim() !== "") || []

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/hospital-selection">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold">Transport Information</h1>
            <div className="w-6"></div>
          </div>

          <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl mb-6 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-sm">Route Map</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Destination</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-semibold">{hospital?.name || "Hospital Name"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ETA</p>
                  <p className="font-semibold">{hospital?.time || "15 min"}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Patient Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Gender/Age</p>
                <p className="font-semibold">{patientData ? `${patientData.gender}, ${patientData.age}` : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Consciousness</p>
                <p className="font-semibold">{patientData?.consciousness || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pupils</p>
                <p className="font-semibold">{patientData?.pupils || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Skin Condition</p>
                <p className="font-semibold">{patientData?.skinCondition || "N/A"}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Vital Signs</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold">Heart Rate</p>
                  <p className="text-sm text-gray-500">{patientData2?.heartRate || "N/A"} bpm</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold">Blood Pressure</p>
                  <p className="text-sm text-gray-500">{patientData2?.bloodPressure || "N/A"} mmHg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Waves className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <p className="font-semibold">Oxygen Saturation</p>
                  <p className="text-sm text-gray-500">{patientData2?.oxygenSaturation || "N/A"}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Cross className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">Symptoms</p>
                  <p className="text-sm text-gray-500">{patientData?.symptoms.join(", ") || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Treatment Given</h2>
            {treatmentItems.length > 0 ? (
              <ul className="space-y-2">
                {treatmentItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No treatment information available</p>
            )}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleNavigate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
            >
              Navigate
            </Button>
            <button
              onClick={() => setShowModal(true)}
              className="w-full text-blue-500 font-semibold py-2 hover:text-blue-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-6">Have you completed the necessary treatment?</p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                Cancel
              </Button>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Confirm</Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
