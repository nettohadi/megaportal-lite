# Megaportal Dashboard

## Overview

This is a [Next.js](https://nextjs.org/) project that uses Typescript, and Hasura.

## Getting Started

1. Clone the repo locally.
2. Install all necessary packages by running `yarn`
3. Run `yarn dev` to get your dev environment up and running

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## The Task

Technical Assignment Task:

Objective: Fix the bugs related to updating the datatable after adding a new target through a modal and the duplication of data when clicking the sync target button.

Steps to follow:
1. Fork the repository from the original repository.
2. Clone the forked repository to your local machine.
3. Set up the development environment if necessary.
4. Analyze the codebase to identify the cause of the bugs.
5. Make necessary changes to fix the bugs while minimizing changes that may impact existing functionality.
6. Test the modified code to ensure that the bugs are resolved and there are no regressions.
7. Commit the changes to your forked repository, providing meaningful commit messages.
8. Push the changes to your forked repository.
9. Share the link to your forked repository with the hiring team for validation.

Bug 1: DataTable not updating after adding a new target through modal:
- Analyze the code related to adding new targets and updating the DataTable.
- Identify any missing or incorrect logic that prevents the DataTable from being updated.
- Make the necessary changes to ensure that the DataTable is updated with the new data after adding a target through the modal.
- Test the functionality thoroughly to confirm that the DataTable is correctly updated.

Bug 2: Duplication of data when clicking the sync target button:
- Review the code associated with the sync target button functionality.
- Identify the reason behind the duplication of data when the button is clicked.
- Modify the code to prevent data duplication while maintaining the desired synchronization functionality.
- Test the synchronization process to verify that the duplication issue is resolved.

Additional guidelines:
- Ensure that your changes follow the existing coding style and conventions used in the codebase.
- Document any significant changes or assumptions made during the bug fixing process.
- Feel free to refactor or optimize the codebase where necessary, but be cautious not to introduce new bugs.
- Test the application thoroughly after making changes to ensure that all functionalities are working as expected.
- Provide a detailed README file that includes instructions for setting up the project, running the application, and any other relevant information.

Please note that the provided video link should be reviewed to gain a better understanding of the bugs and their context.
https://file.io/Kq9k96ETImfb

## Authentication
Get your NEXT_PUBLIC_ACCESS_TOKEN by following this instruction

```
curl -X GET \
  -H "Cookie: appSession=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaWF0IjoxNjg5NTAzODc2LCJ1YXQiOjE2ODk1MTA2NDcsImV4cCI6MTY4OTU5NzA0N30..ozA0yQlAyXydoWsB.Q4eFxC6ypBzTWQJH2jeGLQg1y7ab9mwqRr6hymfG1evxnJtxv_lNGSkzztRWxI5lqq5mfLlwcFjxu3kiEcHfeF5UF1eYCTMlTJtQeszcJGPG4JU5ZiiyMaADrCtwGhtNQJkaXVjrOlSKd6QMbyO5e7401HEKvJbm0nFV2aOKgCWBlviiwC91KPFTiiSwT_C0Pj7ubPF1gJI0y8wHEuWvbzOQcNgc-GVTq8ktrOuh2BcnyPjfOwXxvgdMMhuJLo-AL-0rDrP4HC2slXD8zLKm7mkXn7IJDH8Xmk76WVsmT0G7SIPKIypw8Hb6eKryq-CZvlPsxkJK_5tMmuxxKX1BO36gaEYbL9lQIAib2CanubgtklMhMaj2mX4aTO2lskDQdVa1vpoWWnH9fDvEBeL-KjsUWn5u2GpzzQnRNJTnatRZvylQCGrBb_eU5AfokmhJj1FpoiIf-YFExkOp7qL7p1AeQ8B9ICrAuQTjrkGM3RXNXF-htOHxyqVVOAI0ctOM0G5MBzRZ-NwKx-trwXEXTFq6Qs44RC9AAu6mcoqeCalqBSo_yvhO2Rp_JK5UgidJRoP1ER1lXGcxnZrOAtrktBJNJPAbhNrFfSyTboZiAUTIif83ltwOv456kQ5Uj_aIMkviBTC2xC6OysSZvr3bti_WhZJYbvW12nRFlQs9zoYhyjT6xqSkyQNNA2C-uN4Uymbk0p5mTHYDPsKemkzbtexNnx0rHpjYbTRj192tv7asCk6mfPvboGekFNfCdGLtoulwCNSY-oTlWvF8kML7uxeJqcK20KlCapos0BpZjIytMFg5Uevg-wd-oDER4YgZRGe0PUs9T219W6d9qzpZrZoTvUKw-2J39Bd__d5hfH5KLjk8YjmkvPk-zjE5_Zl5-JziNBdu2QHtc7srRWDTdrITvpmSkNMFZ58UAUS6xBUu3_Xq1sllZWxhV7PbsAXR1_u8pM08MHvwp22rW5b9WNBDImr9jG2UeGySH6c1vDvvL9u_nOHaKkljKAPSfddYItszcnsQD5ltBZoKAQmbhu05CzhEkCARZTZkK59V1omdSd_slWAogl-524alI0sgN2dsyoBIgY_LrOjNGW-cIrP8dwoPhpXUpoYvpeyDchOmkeKIpOOoUYb-f5ezW3XkoMrKBt_sLTz7ak4Sb840fjJFweeJKotdVqcwAiF2nE-N4KL9spra04oKRsOg1RwgLTbICcVS63_40jI2b_22LZRKhfj4rcjo9MGUOYJKwfrNojIhrn0jxORQ6xcUSDc4u9obh-pNHsmRbUTYB95ag_J_uns8eE9JI793Pa0OnxgSzHm_gKum8_ONn2ADKE-s8l-4fIMRTeKnskZOFLKytPccwthd8T7wV0svs5bbXaBgQekezwSK87Esm_OOnSvgSIwXqim0rodnJjAmjibTRf5RdzoEU9hxZYjqqSqjVlKwifO-FhxiM3Pxt8SVmFQB8XUSeUI6YQDXAZvnKOJz86KdYvbk6ZIWII-rukHrsd24V5AFyQaxovVJE9KhbkrOT-dIX7KZA5JQT1MFZ6-zoG9EcVaDE-HUvQsRiI6iVoziJomMOk4QlixTiFZAjj_1lzixiLke0ALt5g7YKbGHMLw3CYsG9VdlznG907_0Jknxzh5pxrJ-HbE9kbVk0AaiJSd4JuSGdIEio2038wqj0iKQJWobzklqBxAlSE3fmpR_4ggNLNcE390B8SaSyVSLMi_jhRZv4i4CFSwgDWJRIXHQKOPQtB3qHPsr9P5-hgqidZZqVCwMQfC8SlJuTxYyyiiOFC3_W4DLZVAEWiZeAn6qk2E0YapRzvDlv1JdUI0brI2sbMU5tWWrj7Ps5gY_ATH7JoPqrGfYiZyZElMJCrZd-nQFPPqKualPz_sxqP0yzOj42T03A0xPOaj-z6h4xy_4eb2SW11e4MM1NHMdewUNw6uSGgdf_cIpxQ5AXq5avPC5qlu-RY-q4HsT0MHlA1kJBF9gftdaMc9LXOrrXBxtu_qKirjI25AOxsyeb5UwPNFMQ_11ZfXFCcUcdQoOPPgjm_POi0GzPbvKMmIzGds3atyViz7Qo0v0_iKtnfHf6Y8DI9zs-mryVZb7zDpXSczExt3eCdhEKwU_PeMi5J1MmbJgNEiaTQFg08O4tYrpRmT_PPvNGmaNIc1gppsPnZmmhXIC6jKupZurf7N5CFGlBwTMIqPrH_kuTpbdrLz4FlmXLR6_1AiypdUoQUknu_oSST43cjRenMAHTvQpzsEXXuzYP_TFXKL024YGff-EiwfNLwSsaKc-v7GDrJYJs5uP9BhIuJv8SdU3KJrTa4tQQQ06-6M21TCdIEq4iLS2rMxLmmuoQYWHl3vMUEZSjKQ1uGLOvUyr29qvqBTb5M4UN9C2tjoC2zlcNnr8ZomeZN7GJKAzkmJKO_Mvha1jjNBm97K6Z7bZ6XN3svsC4LoOCzP0tIzhBtApoIWY8UgITYbN_i55PkyzlC7a6plR4cAVn0XxdYQbsH7K8yXQ3ubwt6j5jL-L3PduXkLaI-8N4VvyrMD475DummWkR31LPOcVsEn-EV-9vApp1N5pwMA000bbwOEfR_d3zbZc047aWJi-V2_HgX4pJR4R6loDCB-sUSU0Jc9doF3o2o6M0DogAy8lq8B4k6ecBWQoIQ1bM3kvAaXJaJrnsfe1ozkqpyMBzE9k6yz-7-OCr4nzXDnZxF2Cy9nwQoC9YF0qFlh6AnoUYEDv-ZPPd9ICDEipxIlLcMXUKRUp-lRCuSeLt4Z58yzKd76JwaX0Am0nJ8lcTxI5p1Ze7NjKx-pNK_bIWgpv3GVy120XiFeuIX1JzOqtrOJbF0n9-XMi5cOJQH2WF3TObT88NoOPF2FtEWlRpXggHHteGUjbdBhaNf7fLeth9KQS2dzbq4RUmlbCeT-S74MAAb10aM_rwnjyoUpaON9dS7P_iT0UnqtFiws-4f63DzGrracGHsnvrhls5LGkZdYHMuRD9WTcQKqG-9jdcBp25Kb_jIAyoTCccvo_OTTWtKQMCxZwotOUBEbHASk4pzdHqsrEhI8spYk_Fpleg-DFrSJJLBTU_82eVFv4Fyuh8ZFyMAOlnyQG5Lu0UHtAadHmC491giWjuOhD3ZYbhdRN-5hxcxoF1xqhhaEfAK8ZAa_WXVeQkQfJvqu7yETQr6L1Rg1G2ZqkEwK7VOgWP6n-IpzwqZ0DebT17sbQ7uugInrZ0plRJMu_z1stFhSSCQ2-cr06fUDAKULiP2u6hg9-O2bJlMJJw4ttaSmllUayNMCjzhZrrrJ9xsKEpiZXxBx_Ef8x4suD9SGdRzk4cIQgf19Wnmq2qQk_Pfwk_4Lyjk3CmKDaDxouiBT4sJDwk6_j2eVHUVnr_RywS90NjuGdVoBy8UEX857762O-Zw0S2WiZ7fURw3N98W1RgEmFq-nkzGwJd5_YWTYgiREEPYMFF7fQgbGDSHKgfhciZSOZeSyptwBL3S8_M5YXrdLAhYH3mvqkRpnwF4_Wtz4XsIXHAldxHdElwJN8Sz5DZV-jkrpKbtAtYFWnDvzhAztCQFm9uv0B8F3LKNVQAw1VbjuAjiMwJOTvycTzsRRNCG6Hawj9lSU3xatbZblgKpuXw-whqnpSLnqYiAbWumJtqW17zI7UQDpAQICcfFyT8907AE6C5s_2I4GN0bijqF1HNOcvVZkt2C4KXoekJgDreGtQTsfQRk1hu7627xNAGb_vwfAWYvhx9s475DnUySTqhmSIJcwM_go2RDXgyZQAgxQQL7iVWmGGxE2810IC2ej0UpRjb7qGe9jbkbvksRjAA01dehfBQZ4Teo2Ax8Ff1yU.W-1ebP-3Jfgh3PiPMiAHCQ" \
  https://8c908cb8568729.lhr.life/api/session
```

1. Copy token value and paste it to NEXT_PUBLIC_ACCESS_TOKEN
2. If issue persist please reachout to my email.
