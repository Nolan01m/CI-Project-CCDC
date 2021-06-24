import * as network from "@pulumi/azure-native/network";
import * as index from "./index";
var ccdc = index.ccdc
// Internal 172.20.240.0
// Public 172.20.241.0
// User 172.20.242.0

//Internal Network for Instances
const Virt_Network = new network.VirtualNetwork("topology-network", {
    resourceGroupName: "jc-ccdc",
    addressSpace: { addressPrefixes: ["172.20.240.0/23"] },
    subnets: [{
        name: "Internal",
        addressPrefix: "172.20.240.0/25",
    },
    {
        name: "Public",
        addressPrefix: "172.20.241.0/25",
    },
    {
        name: "User",
        addressPrefix: "172.20.242.0/25",
    }],
});

//Public IPs Public Subnet

const publicIp = new network.PublicIPAddress("jccdc_ip_1_public", {
    resourceGroupName: "jc-ccdc",
    publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
}, { parent: Virt_Network });
const publicIp2 = new network.PublicIPAddress("jccdc_ip_2_public", {
    resourceGroupName: "jc-ccdc",
    publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
}, { parent: Virt_Network });
const publicIp3 = new network.PublicIPAddress("jccdc_ip_3_public", {
    resourceGroupName: "jc-ccdc",
    publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
}, { parent: Virt_Network });

//Nics for Instances
const networkInterface = new network.NetworkInterface("nic1_public", {
    resourceGroupName: "jc-ccdc",
    ipConfigurations: [{
        name: "nic1_public",
        subnet: { id: Virt_Network.subnets[0].id },
        privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
        publicIPAddress: { id: publicIp.id },
    }],
});
const networkInterface2 = new network.NetworkInterface("nic2_public", {
    resourceGroupName: "jc-ccdc",
    ipConfigurations: [{
        name: "nic2_public",
        subnet: { id: Virt_Network.subnets[0].id },
        privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
        publicIPAddress: { id: publicIp2.id },
    }],
});
const networkInterface3 = new network.NetworkInterface("nic3_public", {
    resourceGroupName: "jc-ccdc",
    ipConfigurations: [{
        name: "nic3_public",
        subnet: { id: Virt_Network.subnets[0].id },
        privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
        publicIPAddress: { id: publicIp3.id },
    }],
});