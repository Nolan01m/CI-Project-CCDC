//To Test -- Run: 'npx ts-node ./test.ts'
let list: number[] = [1,2,3];
let name1: string = "Network_";
let name2: string = "range";

for (let index = 0; index < list.length; index++) {
    const output1 = name1 + list[index];
    const output2 = name2 + list[index];
    console.log(output1 + '---' + output2 )
}



