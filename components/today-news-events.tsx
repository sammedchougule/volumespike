'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, Newspaper, TrendingUp, PieChart, Building2, DollarSign } from 'lucide-react'

interface NewsEvent {
  title: string
  time: string
  type: string
  tag?: string
  isUrgent?: boolean
  exDate?: string
}

const newsEvents: NewsEvent[] = [
  {
    title: 'Barometers trade with tiny cuts, auto shares gear up',
    time: '2 HOURS AGO',
    type: 'CAPITAL MARKET - LIVE',
    tag: 'ASTERDM'
  },
  {
    title: 'Rights Issue of Equity Shares',
    time: '19:10',
    type: 'Rights Issue',
    isUrgent: true,
    exDate: 'Nov 28, 2024'
  },
  {
    title: 'Q2 Results: Company XYZ beats estimates',
    time: '1 HOUR AGO',
    type: 'EARNINGS',
    tag: 'XYZCO'
  },
  {
    title: 'Central Bank announces interest rate decision',
    time: '30 MINUTES AGO',
    type: 'MACRO',
    isUrgent: true
  },
  {
    title: 'Tech Giant ABC declares quarterly dividend',
    time: '3 HOURS AGO',
    type: 'DIVIDENDS',
    tag: 'ABCTECH'
  }
]

const tabData = [
  { id: 'all', label: 'All', icon: <Bell className="w-4 h-4" />, color: 'bg-blue-500' },
  { id: 'news', label: 'News', icon: <Newspaper className="w-4 h-4" />, color: 'bg-green-500' },
  { id: 'macro', label: 'Macro', icon: <TrendingUp className="w-4 h-4" />, color: 'bg-red-500' },
  { id: 'earnings', label: 'Earnings', icon: <PieChart className="w-4 h-4" />, color: 'bg-yellow-500' },
  { id: 'corp-action', label: 'Corp Action', icon: <Building2 className="w-4 h-4" />, color: 'bg-purple-500' },
  { id: 'dividends', label: 'Dividends', icon: <DollarSign className="w-4 h-4" />, color: 'bg-indigo-500' },
]

export default function TodayNewsEvents() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <Card className="shadow-lg bg-gray-800">
      <CardHeader className="flex flex-col space-y-4">
        <CardTitle className="text-white">Today&apos;s news and events</CardTitle>
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === tab.id ? `${tab.color} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      {/* <CardContent>
        <div className="space-y-4">
          {newsEvents.map((event, index) => (
            <div key={index} className="p-3 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  {event.tag && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                      {event.tag}
                    </span>
                  )}
                  {event.isUrgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 ml-2">
                      URGENT
                    </span>
                  )}
                  <h3 className="text-white font-medium">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>{event.time}</span>
                    <span className="mx-2">•</span>
                    <span>{event.type}</span>
                  </div>
                </div>
                {event.exDate && (
                  <div className="text-right text-sm">
                    <p className="text-gray-400">Ex Date</p>
                    <p className="text-white">{event.exDate}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent> */}

      <CardContent>
        <div className="space-y-4">
          {/* Check if newsEvents is loading or empty */}
          {newsEvents.length === 0 ? (
            // Skeleton loader while loading
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-700 rounded-lg transition-colors animate-pulse"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      {/* Skeleton for tag */}
                      <div className="w-24 h-4 bg-gray-600 rounded"></div>

                      {/* Skeleton for title */}
                      <div className="w-32 h-6 bg-gray-600 rounded"></div>

                      {/* Skeleton for time and type */}
                      <div className="flex items-center text-sm text-gray-400 space-x-2">
                        <div className="w-16 h-4 bg-gray-600 rounded"></div>
                        <div className="w-8 h-4 bg-gray-600 rounded"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                    {/* Skeleton for ex date */}
                    <div className="w-16 h-4 bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Display the actual content
            newsEvents.map((event, index) => (
              <div key={index} className="p-3 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {event.tag && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                        {event.tag}
                      </span>
                    )}
                    {event.isUrgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 ml-2">
                        URGENT
                      </span>
                    )}
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{event.time}</span>
                      <span className="mx-2">•</span>
                      <span>{event.type}</span>
                    </div>
                  </div>
                  {event.exDate && (
                    <div className="text-right text-sm">
                      <p className="text-gray-400">{event.exDate}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>



    </Card>
  )
}

