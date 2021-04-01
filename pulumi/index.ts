import * as pulumi from "@pulumi/pulumi";

import * as compute from "@pulumi/azure-native/compute";
import * as resources from "@pulumi/azure-native/resources";
//import * as storage from "@pulumi/azure-native/storage";
import * as network from "@pulumi/azure-native/network";

const config = new pulumi.Config();
const username = config.require("username");
const password = config.requireSecret("password");
// pulumi config set jcccdc:username

// Azure Resource Group -- Similar to a VPC
const ccdc = new resources.ResourceGroup("jc-ccdc").name;

// Create a network and subnet for all VMs.
const Virt_Network = new network.VirtualNetwork("topology-network", {
    resourceGroupName: ccdc,
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
const publicIp = new network.PublicIPAddress("External Access IP", {
    resourceGroupName: ccdc,
    publicIPAllocationMethod: network.IPAllocationMethod.Dynamic,
}, { parent: Virt_Network });

const networkInterface = new network.NetworkInterface("server-nic", {
    resourceGroupName: ccdc,
    ipConfigurations: [{
        name: "webserveripcfg",
        subnet: { id: Virt_Network.subnets[0].id },
        privateIPAllocationMethod: network.IPAllocationMethod.Dynamic,
        publicIPAddress: { id: publicIp.id },
    }],
});
const virtualMachine = new compute.VirtualMachine("virtualMachine", {
    hardwareProfile: {
        vmSize: "Standard_D2s_v3",
    },
    location: "westus",
    networkProfile: {
        networkInterfaces: [{
            id: networkInterface.id,
            primary: true,
        }],
    },
    osProfile: {
        adminPassword: password,
        adminUsername: username,
        computerName: "myTestVM",
        linuxConfiguration: {
            patchSettings: {
                patchMode: "AutomaticByPlatform",
            },
            provisionVMAgent: true,
        },
    },
    resourceGroupName: "myResourceGroup",
    storageProfile: {
        imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "16.04-LTS",
            version: "latest",
        },
        osDisk: {
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: {
                storageAccountType: "Premium_LRS",
            },
            name: "myVMosdisk",
        },
    },
    vmName: "myVM",
});
// Internal 172.20.240.0
// Public 172.20.241.0
// User 172.20.242.0