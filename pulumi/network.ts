import * as network from "@pulumi/azure-native/network";
import {ccdc} from "./index";
// Internal 172.20.240.0
// Public 172.20.241.0
// User 172.20.242.0

//Internal Network for Instances
const Virt_Network = new network.VirtualNetwork("topology-network", {
    resourceGroupName: "ccdc",
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [{
        name: "ccdc_internal",
        addressPrefix: "10.0.1.0/24",
    },
    {
        name: "ccdc_public",
        addressPrefix: "10.0.2.0/24",
    },
    {
        name: "ccdc_user",
        addressPrefix: "10.0.3.0/24",
    }
],
}, { parent: ccdc });

//Internal IP Range
export let IPs_int: any[] = [];
export let INTs_int: any[] = [];
for (let i = 1; i < 4; i++) {
    IPs_int[i] = new network.PublicIPAddress(`ip${i}_int`,{
        resourceGroupName: ccdc.name,
        publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
    },{ parent: Virt_Network })
    INTs_int[i] = new network.NetworkInterface(`nic${i}_int`, {
        resourceGroupName: ccdc.name,
        ipConfigurations: [{
            name: `nic${i}_int`,
            subnet: { id: Virt_Network.subnets[0].id },
            privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
            publicIPAddress: { id: IPs_int[i].id },
        }],
    },{ parent: IPs_int[i] })
}

//Public IP Range
export let IPs_pub: any[] = [];
export let INTs_pub: any[] = [];
for (let i = 1; i < 4; i++) {
    IPs_pub[i] = new network.PublicIPAddress(`ip${i}_pub`,{
        resourceGroupName: ccdc.name,
        publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
    },{ parent: Virt_Network })
    INTs_pub[i] = new network.NetworkInterface(`nic${i}_pub`, {
        resourceGroupName: ccdc.name,
        ipConfigurations: [{
            name: `nic${i}_pub`,
            subnet: { id: Virt_Network.subnets[1].id },
            privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
            publicIPAddress: { id: IPs_pub[i].id },
        }],
    },{ parent: IPs_pub[i] })
}

//User IP Range
export let IPs_usr: any[] = [];
export let INTs_usr: any[] = [];
for (let i = 1; i < 4; i++) {
    IPs_usr[i] = new network.PublicIPAddress(`ip${i}_usr`,{
        resourceGroupName: ccdc.name,
        publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
    },{ parent: Virt_Network })
    INTs_usr[i] = new network.NetworkInterface(`nic${i}_usr`, {
        resourceGroupName: ccdc.name,
        ipConfigurations: [{
            name: `nic${i}_usr`,
            subnet: { id: Virt_Network.subnets[1].id },
            privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
            publicIPAddress: { id: IPs_usr[i].id },
        }],
    },{ parent: IPs_usr[i] })
}