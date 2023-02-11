const links =
{
    login: 'login',
    logout: 'logout',
    plantList: 'index/getPlantListTitle',
    devicesByPlantList : "panel/getDevicesByPlantList",
    deviceEnergyDataDayUrl: "energy/compare/getDevicesDayChart",
    deviceEnergyDataMonthUrl: "energy/compare/getDevicesMonthChart",
    deviceEnergyDataYearUrl: "energy/compare/getDevicesYearChart",
    deviceEnergyDataTotalUrl: "energy/compare/getDevicesTotalChart",
    inverterEnergyDataDayUrl : "panel/inv/getInvDayChart",
    inverterEnergyDataMonthUrl : "panel/inv/getInvMonthChart",
    inverterEnergyDataYearUrl : "panel/inv/getInvYearChart",
    inverterEnergyDataTotalUrl : "panel/inv/getInvTotalChart",
    deviceInfo: "panel/getDeviceInfo",
    weather: "index/getWeatherByPlantId",
    plantData: "panel/getPlantData",
    storageTotalData : "panel/storage/getStorageTotalData",
    storageStatusData : "panel/storage/getStorageStatusData",
    storageBatteryData : "panel/storage/getStorageBatChart",
    storageEnergyDayData : "panel/storage/getStorageEnergyDayChart"
    
}

module.exports = {links}